// Import the database configuration
const DB = require("../../config/postgres.config");

// Functions to get all reviews
async function getReviews(req, res) {
  try {
    const query = "SELECT * FROM reviews";
    const results = await DB.query(query);

     // Check if any reviews are found
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No reviews found !"});
      return;
    }
    // Send the found reviews as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

async function getAllReviewsInfo(req, res) {
  try {
    const query = `
    SELECT
      r.review_id, r.comment, r.rating, r.status,
      m.movie_id, m.title AS movie_title
    FROM 
      reviews r
    JOIN 
      movies m 
    ON 
      r.movie_id = m.movie_id
    `;
    const results = await DB.query(query);

     // Check if any reviews are found
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No reviews found !"});
      return [];
    }
    return results.rows
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to get a reviews by ID
async function getReviewsById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM reviews WHERE review_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the reviews with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No reviews id found !"});
      return;
    }
    // Send the found reviews as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

async function getReviewsByMovieId(req, res) {
  const movieId = req.params.id;
  console.log(`Fetching reviews for movie ID: ${movieId}`);
  try {
    const query = "SELECT * FROM reviews WHERE movie_id = $1";
    const result = await DB.query(query, [movieId]);
    return result.rows;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
    return [];
  }
}

// Function to create a new review
async function postReviews(req, res) {
  try {
    const { user_id, movie_id, rating, comment } = req.body;

    // Validate the request body fields
    if (!user_id || !movie_id || !rating || !comment) {
      req.flash('error_msg', 'Vous devez remplir tous les champs obligatoires !');
      return res.redirect('back');
    }

    // Vérifier s'il existe déjà une revue pour cet utilisateur et ce film
    const checkQuery = "SELECT * FROM reviews WHERE user_id = $1 AND movie_id = $2";
    const checkResult = await DB.query(checkQuery, [user_id, movie_id]);

    if (checkResult.rows.length > 0) {
      req.flash('error_msg', 'Vous avez déjà soumis un avis pour ce film.');
      return res.redirect('back');
    }

    // Insérer une nouvelle revue
    const insertQuery = "INSERT INTO reviews (user_id, movie_id, rating, comment, status, created_at) VALUES ($1, $2, $3, $4, 'false', NOW()) RETURNING *";
    const insertResult = await DB.query(insertQuery, [user_id, movie_id, rating, comment]);

    req.flash('success_msg', 'Votre avis a été soumis avec succès !');
    res.redirect(`/dashboard/users/reviews-form/${movie_id}`);
  } catch (err) {
    console.log(err);
    req.flash('error_msg', 'Erreur interne du serveur !');
    res.redirect('back');
  }
}
  
  

async function updateReviewsById(req, res) {
  try {
    const { review_id } = req.params;

    const checkIfExistQuery = "SELECT * FROM reviews WHERE review_id = $1";
    const reviewExist = await DB.query(checkIfExistQuery, [review_id]);

    if (reviewExist.rows.length <= 0) {
      return res.status(404).json({ message: "Review with the provided ID does not exist." });
    }

    const query = "UPDATE reviews SET status = true WHERE review_id = $1 RETURNING *";
    const result = await DB.query(query, [review_id]);

    return res.status(200).json({ message: "Review updated successfully", review: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}


async function deleteReviewsById(req, res) {
  try {
    const id = req.params.id;
    const foundReviewsQuery = "SELECT * FROM reviews WHERE review_id = $1";
    const reviews = await DB.query(foundReviewsQuery, [id]);
    
    if (reviews.rows.length !== 0) {
      const query = "DELETE FROM reviews WHERE review_id = $1";
      await DB.query(query, [id]);
      
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ message: "No review found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}
  

// Export the functions as a module
module.exports = {
  getReviews,
  getReviewsById,
  getReviewsByMovieId,
  getAllReviewsInfo,
  postReviews,
  deleteReviewsById,
  updateReviewsById,
};