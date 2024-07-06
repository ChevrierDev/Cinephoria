document.addEventListener("DOMContentLoaded", () => {
    const validateReviewButtons = document.querySelectorAll('.validate-review');
    const deleteReviewButtons = document.querySelectorAll('.delete-review');
  
    validateReviewButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const reviewId = button.getAttribute('data-review-id');
  
        try {
          const response = await fetch(`/api/v1/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: true })
          });
  
          if (response.ok) {
            window.location.reload();
          } else {
            const result = await response.json();
            alert(result.error || 'Something went wrong!');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong!');
        }
      });
    });

    deleteReviewButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
          e.preventDefault();
          const reviewId = button.getAttribute('data-review-id');
    
          try {
            const response = await fetch(`/api/v1/reviews/${reviewId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (response.ok) {
              window.location.reload();
            } else {
              const result = await response.json();
              alert(result.error || 'Something went wrong!');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
          }
        });
      });
  });
  