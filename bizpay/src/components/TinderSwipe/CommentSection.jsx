import React, { useState } from 'react';
import { IconButton, Button, Modal, Snackbar, Alert } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styles from './comment.module.scss';

const CommentSection = ({ nftId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, likes: 0, dislikes: 0 }]);
      setNewComment('');
      setSnackbarOpen(true); // Open success popup
    }
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleDislike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
    ));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.commentSection}>
      <h4 className='text-white font-sm'>Comments</h4>
      <div className={styles.addComment}>
      <textarea
        className={styles.textarea}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Coming Soon..."
        />
        <div className={styles.actions}>
        <Button
          className={styles.postButton}
          variant="contained"
          onClick={handleAddComment}
          style={{ 
            backgroundColor: '#c71585', 
            color: 'white', 
            marginRight: '16px', 
            opacity: 0.5, 
            transition: 'opacity 0.3s ease' 
          }}
          onMouseEnter={(e) => e.target.style.opacity = 0.7}
          onMouseLeave={(e) => e.target.style.opacity = 0.4}
        >
          Post
        </Button>

        <Button
          className={styles.seeCommentsButton}
          variant="contained"
          onClick={handleModalOpen}
          style={{ 
            opacity: 0.8, 
            transition: 'opacity 0.3s ease' 
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.8}
        >
          Comments
        </Button>

        </div>
      </div>
      

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className={styles.modalContent}>
          <h4>Comments for {nftId}</h4>
          <div className={styles.commentList}>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className={styles.comment}>
                  <p>{comment.text}</p>
                  <div className={styles.commentActions}>
                    <IconButton onClick={() => handleLike(comment.id)}>
                      <ThumbUpIcon fontSize="small" /> <span>{comment.likes}</span>
                    </IconButton>
                    <IconButton onClick={() => handleDislike(comment.id)}>
                      <ThumbDownIcon fontSize="small" /> <span>{comment.dislikes}</span>
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          <Button onClick={handleModalClose} className={styles.closeModal}>
            Close
        </Button>
        </div>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: '#7b1fa2', // Violet background
            color: 'white',
          }}
        >
          Post successfully made!
        </Alert>
      </Snackbar>

    </div>
  );
};

export default CommentSection;
