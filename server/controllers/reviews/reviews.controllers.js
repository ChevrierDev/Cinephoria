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
  
  

// Note: Bug to fix (unable to post)
// Function to update a reviews by ID
async function updateReviewsById(req, res) {
  try {
    const id = req.params.id;
    const {
      user_id,
      movie_id,
      rating,
      comment,
      status,
    } = req.body;

    const checkIfexistQuery = "SELECT * FROM reviews WHERE review_id = $1";
    const reviewExist = await DB.query(checkIfexistQuery, [id]);

    if (reviewExist.rows.length <= 0) {
        return res.status(404).json({message: "Reviews with this provided ID does not exist."})
    }

    const query =
      "UPDATE reviews SET user_id = $1, movie_id = $2, rating = $3, comment = $4, status = $5, created_at = NOW() WHERE review_id = $6 RETURNING *";
    const result = await DB.query(query, [
      user_id,
      movie_id,
      rating,
      comment,
      status,
      id,
    ]);
    // Send a success message as response
    return res.status(200).json({ message: "reviews updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to delete a review by ID
async function deleteReviewsById(req, res) {
    try {
      const id = req.params.id;
      const foundReviewsQuery = "SELECT * FROM reviews WHERE review_id = $1";
      const reviews = await DB.query(foundReviewsQuery, [id]);
       // Check if the review with the given ID is found
      if (reviews.rows.length !== 0) {
        const query = "DELETE FROM reviews WHERE review_id = $1";
        await DB.query(query, [id]);
        // Send a success message as response
        return res.status(200).json({message:"Review deleted successfully"});
      } else {
        return res.status(404).json({message:"No review found!"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error!");
    }
  }
  

// Export the functions as a module
module.exports = {
  getReviews,
  getReviewsById,
  postReviews,
  deleteReviewsById,
  updateReviewsById,
};