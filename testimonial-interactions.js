// Function to show reaction options
function showReactionOptions(btn) {
  // Get or create the reaction options container
  let reactionOptions = btn.nextElementSibling;
  if (!reactionOptions || !reactionOptions.classList.contains('reaction-options')) {
    reactionOptions = document.createElement('div');
    reactionOptions.className = 'reaction-options';
    reactionOptions.innerHTML = `
      <button class="reaction-option" data-reaction="like" onclick="handleReaction(this, 'like')">👍</button>
      <button class="reaction-option" data-reaction="love" onclick="handleReaction(this, 'love')">❤️</button>
      <button class="reaction-option" data-reaction="haha" onclick="handleReaction(this, 'haha')">😂</button>
      <button class="reaction-option" data-reaction="wow" onclick="handleReaction(this, 'wow')">😮</button>
      <button class="reaction-option" data-reaction="sad" onclick="handleReaction(this, 'sad')">😢</button>
      <button class="reaction-option" data-reaction="angry" onclick="handleReaction(this, 'angry')">😡</button>
    `;
    btn.parentNode.insertBefore(reactionOptions, btn.nextSibling);
    
    // Style the reaction options
    reactionOptions.style.display = 'flex';
    reactionOptions.style.position = 'absolute';
    reactionOptions.style.bottom = '40px';
    reactionOptions.style.left = '0';
    reactionOptions.style.backgroundColor = '#1e2430';
    reactionOptions.style.borderRadius = '30px';
    reactionOptions.style.padding = '6px 8px';
    reactionOptions.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    reactionOptions.style.zIndex = '100';
    reactionOptions.style.transition = 'all 0.2s ease';
    
    // Style each reaction option button
    const reactionButtons = reactionOptions.querySelectorAll('.reaction-option');
    reactionButtons.forEach(button => {
      button.style.border = 'none';
      button.style.background = 'transparent';
      button.style.fontSize = '1.2rem';
      button.style.padding = '5px';
      button.style.cursor = 'pointer';
      button.style.transition = 'transform 0.2s ease';
      
      // Add hover effect
      button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.3)';
      });
      
      button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
      });
    });
    
    // Hide when clicking outside
    document.addEventListener('click', function hideReactions(e) {
      if (!btn.contains(e.target) && !reactionOptions.contains(e.target)) {
        reactionOptions.remove();
        document.removeEventListener('click', hideReactions);
      }
    });
  }
}

// Function to handle reactions
function handleReaction(btn, reactionType) {
  // Find the parent testimonial box
  const testimonialBox = btn.closest('[data-testimonial-id]') || btn.closest('.cta-course-card');
  if (!testimonialBox) return;
  
  // Find the like button
  const likeBtn = testimonialBox.querySelector('.like-btn');
  if (!likeBtn) return;
  
  // Get the reaction type
  const reaction = reactionType || 'like';
  
  // Get or create the count element
  let countEl = likeBtn.querySelector('.like-count');
  if (!countEl) {
    countEl = document.createElement('span');
    countEl.className = 'like-count';
    likeBtn.appendChild(countEl);
  }
  
  // Get the current count value
  let count = parseInt(likeBtn.getAttribute('data-count') || '0');
  
  // Check if button is already active with this reaction
  const currentReaction = likeBtn.getAttribute('data-reaction');
  const isActive = likeBtn.classList.contains('active');
  
  if (isActive && currentReaction === reaction) {
    // If same reaction, toggle it off
    likeBtn.classList.remove('active');
    likeBtn.style.color = '#768390';
    likeBtn.setAttribute('data-reaction', '');
    count--;
    if (count < 0) count = 0;
  } else {
    // If different reaction or not active, set the new reaction
    if (!isActive) {
      // If not active, increment count
      count++;
    }
    likeBtn.classList.add('active');
    likeBtn.style.color = '#FFC72C';
    likeBtn.setAttribute('data-reaction', reaction);
    
    // Update button text based on reaction
    let reactionEmoji = '👍';
    switch (reaction) {
      case 'love': reactionEmoji = '❤️'; break;
      case 'haha': reactionEmoji = '😂'; break;
      case 'wow': reactionEmoji = '😮'; break;
      case 'sad': reactionEmoji = '😢'; break;
      case 'angry': reactionEmoji = '😡'; break;
    }
    
    likeBtn.innerHTML = `${reactionEmoji} <span style="margin-left:3px">Like</span> `;
    likeBtn.appendChild(countEl);
  }
  
  // Update the data attribute and display
  likeBtn.setAttribute('data-count', count);
  
  // Only show count if greater than 0
  if (count > 0) {
    countEl.textContent = count;
    countEl.style.display = 'inline';
  } else {
    countEl.style.display = 'none';
  }
  
  // Remove the reaction options panel
  const reactionOptions = testimonialBox.querySelector('.reaction-options');
  if (reactionOptions) {
    reactionOptions.remove();
  }
  
  // Add the reaction below the post (Facebook style)
  addReactionBelow(testimonialBox, reaction, isActive && currentReaction === reaction);
}

// Function to handle like button clicks
function handleLike(btn) {
  // Handle direct like first (when clicking the Like button)
  handleDirectLike(btn);
  
  // Also show reaction options for other reactions
  showReactionOptions(btn);
}

// Function to directly apply a like without showing reaction options
function handleDirectLike(btn) {
  // Find the parent testimonial box
  const testimonialBox = btn.closest('[data-testimonial-id]') || btn.closest('.cta-course-card');
  if (!testimonialBox) return;
  
  // Get or create the count element
  let countEl = btn.querySelector('.like-count');
  if (!countEl) {
    countEl = document.createElement('span');
    countEl.className = 'like-count';
    btn.appendChild(countEl);
  }
  
  // Get the current count value
  let count = parseInt(btn.getAttribute('data-count') || '0');
  
  // Check if button is already active with a reaction
  const currentReaction = btn.getAttribute('data-reaction');
  const isActive = btn.classList.contains('active');
  
  if (isActive) {
    // If already active, toggle it off
    btn.classList.remove('active');
    btn.style.color = '#768390';
    btn.setAttribute('data-reaction', '');
    count--;
    if (count < 0) count = 0;
    // Remove the Facebook-style reaction
    addReactionBelow(testimonialBox, 'like', true);
  } else {
    // If not active, turn on like reaction
    btn.classList.add('active');
    btn.style.color = '#FFC72C';
    btn.setAttribute('data-reaction', 'like');
    count++;
    
    // Update button text to show like icon
    btn.innerHTML = `👍 <span style="margin-left:3px">Like</span> `;
    btn.appendChild(countEl);
    
    // Add Facebook-style reaction below
    addReactionBelow(testimonialBox, 'like', false);
  }
  
  // Update the data attribute and display
  btn.setAttribute('data-count', count);
  
  // Only show count if greater than 0
  if (count > 0) {
    countEl.textContent = count;
    countEl.style.display = 'inline';
  } else {
    countEl.style.display = 'none';
  }
}

// Function to add a reaction below the post (Facebook-style)
function addReactionBelow(testimonialBox, reaction, isRemove) {
  // If removing reaction, clear it
  if (isRemove) {
    // Remove existing reactions
    const existingReactions = testimonialBox.querySelectorAll('.facebook-reaction');
    existingReactions.forEach(el => el.remove());
    return;
  }
  
  // First, check if there's already a reaction row
  let reactionRow = testimonialBox.querySelector('.facebook-reactions-row');
  
  if (!reactionRow) {
    // Create a new reaction row similar to Facebook
    reactionRow = document.createElement('div');
    reactionRow.className = 'facebook-reactions-row';
    reactionRow.style.display = 'flex';
    reactionRow.style.alignItems = 'center';
    reactionRow.style.marginTop = '8px';
    reactionRow.style.paddingLeft = '2px';
    
    // Insert after the like button container
    const likeContainer = testimonialBox.querySelector('.like-btn').parentNode;
    testimonialBox.insertBefore(reactionRow, likeContainer.nextSibling);
  }
  
  // Clear existing reactions
  reactionRow.innerHTML = '';
  
  // Get the emoji for this reaction
  let reactionEmoji = '';
  let reactionLabel = '';
  switch (reaction) {
    case 'like': 
      reactionEmoji = '👍'; 
      reactionLabel = 'Like';
      break;
    case 'love': 
      reactionEmoji = '❤️'; 
      reactionLabel = 'Love';
      break;
    case 'haha': 
      reactionEmoji = '😂'; 
      reactionLabel = 'Haha';
      break;
    case 'wow': 
      reactionEmoji = '😮'; 
      reactionLabel = 'Wow';
      break;
    case 'sad': 
      reactionEmoji = '😢'; 
      reactionLabel = 'Sad';
      break;
    case 'angry': 
      reactionEmoji = '😡'; 
      reactionLabel = 'Angry';
      break;
    default: 
      reactionEmoji = '👍';
      reactionLabel = 'Like';
  }
  
  // Create the Facebook-style reaction container
  const facebookReaction = document.createElement('div');
  facebookReaction.className = 'facebook-reaction';
  facebookReaction.style.display = 'flex';
  facebookReaction.style.alignItems = 'center';
  facebookReaction.style.background = 'rgba(255, 199, 44, 0.1)';
  facebookReaction.style.borderRadius = '12px';
  facebookReaction.style.padding = '4px 8px';
  facebookReaction.style.margin = '2px';
  
  // Create the emoji element
  const emojiEl = document.createElement('span');
  emojiEl.innerHTML = reactionEmoji;
  emojiEl.style.fontSize = '16px';
  emojiEl.style.marginRight = '4px';
  
  // Create the label element
  const labelEl = document.createElement('span');
  labelEl.textContent = 'You';
  labelEl.style.fontSize = '12px';
  labelEl.style.color = '#FFC72C';
  labelEl.style.fontWeight = 'bold';
  
  // Assemble the reaction
  facebookReaction.appendChild(emojiEl);
  facebookReaction.appendChild(labelEl);
  
  // Add to the reaction row
  reactionRow.appendChild(facebookReaction);
  
  // Add a count indicator (simulating more reactions)
  const countIndicator = document.createElement('span');
  countIndicator.textContent = 'You and ' + Math.floor(Math.random() * 10 + 1) + ' others';
  countIndicator.style.fontSize = '12px';
  countIndicator.style.color = '#768390';
  countIndicator.style.marginLeft = '8px';
  reactionRow.appendChild(countIndicator);
}

// Function to remove user reaction when toggled off
function removeUserReaction(testimonialBox) {
  const userId = 'current-user'; // Simulating current user ID
  const userReaction = testimonialBox.querySelector(`.user-reaction[data-user-id="${userId}"]`);
  
  if (userReaction) {
    // Remove the reaction element
    userReaction.remove();
    
    // Check if there are no more reactions
    const reactionsDisplay = testimonialBox.querySelector('.reactions-display');
    const remainingReactions = reactionsDisplay.querySelectorAll('.user-reaction');
    
    if (remainingReactions.length === 0) {
      // If no more reactions, remove the entire display
      const reactionText = reactionsDisplay.querySelector('.reaction-text');
      if (reactionText) reactionText.remove();
      reactionsDisplay.remove();
    }
  }
}

// Show comment form when Comment button is clicked
function showCommentForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = 'block';
    const input = form.querySelector('.comment-input');
    if (input) input.focus();
    
    // Highlight the comment button
    const btn = document.querySelector(`[data-form-id="${formId}"]`);
    if (btn) btn.classList.add('active');
  }
}

// Hide comment form
function hideCommentForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = 'none';
    const input = form.querySelector('.comment-input');
    if (input) input.value = '';
    
    // Remove highlight from comment button if no comments
    const btn = document.querySelector(`[data-form-id="${formId}"]`);
    if (btn && !form.parentNode.querySelector('.user-comment')) {
      btn.classList.remove('active');
    }
  }
}

// Submit a new comment
function submitComment(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const input = form.querySelector('.comment-input');
  if (!input) return;
  
  const comment = input.value.trim();
  
  if (comment) {
    // Create a new comment element with gold accent border
    const commentBox = document.createElement('div');
    commentBox.className = 'user-comment';
    commentBox.style.padding = '8px';
    commentBox.style.marginTop = '8px';
    commentBox.style.backgroundColor = 'rgba(255, 199, 44, 0.05)';
    commentBox.style.borderRadius = '4px';
    commentBox.style.fontSize = '0.85rem';
    commentBox.style.color = '#adbac7';
    commentBox.style.borderLeft = '2px solid #FFC72C';
    
    // Add username and comment text
    const username = document.createElement('span');
    username.style.fontWeight = 'bold';
    username.style.color = '#fff';
    username.textContent = 'You: ';
    
    commentBox.appendChild(username);
    commentBox.appendChild(document.createTextNode(comment));
    
    // Insert comment before the form
    form.parentNode.insertBefore(commentBox, form);
    
    // Hide the form and clear input
    hideCommentForm(formId);
    
    // Keep the comment button highlighted to show there are comments
    const btn = document.querySelector(`[data-form-id="${formId}"]`);
    if (btn) btn.classList.add('active');
  }
}

// Function to share image by copying its URL to clipboard
function shareImage(btn) {
  const testimonialBox = btn.closest('[data-testimonial-id]');
  if (!testimonialBox) return;
  
  const img = testimonialBox.querySelector('img[alt="Success Proof"]');
  if (!img) return;
  
  // Get image URL
  const imgUrl = window.location.origin + '/' + img.getAttribute('src');
  
  // Copy to clipboard
  navigator.clipboard.writeText(imgUrl).then(() => {
    // Show copied message
    btn.classList.add('active');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    
    // Reset after 2 seconds
    setTimeout(() => {
      btn.classList.remove('active');
      btn.textContent = originalText;
    }, 2000);
  });
}

// Initialize all buttons when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Apply initial styles to all social buttons
  const allButtons = document.querySelectorAll('.like-btn, .comment-btn, .share-btn');
  allButtons.forEach(btn => {
    // Ensure proper styling
    btn.style.border = 'none';
    btn.style.background = 'transparent';
    btn.style.color = '#768390';
    btn.style.padding = '6px 10px';
    btn.style.marginRight = '8px';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'all 0.2s ease';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.gap = '4px';
    
    // Add hover event to show gold color on hover
    btn.addEventListener('mouseover', function() {
      this.style.backgroundColor = 'rgba(255, 199, 44, 0.1)';
      this.style.color = '#FFC72C';
    });
    
    btn.addEventListener('mouseout', function() {
      if (!this.classList.contains('active')) {
        this.style.backgroundColor = 'transparent';
        this.style.color = '#768390';
      }
    });
  });
  
  // Style cancel and submit buttons
  const cancelButtons = document.querySelectorAll('.cancel-btn');
  cancelButtons.forEach(btn => {
    btn.style.padding = '5px 10px';
    btn.style.borderRadius = '4px';
    btn.style.backgroundColor = 'transparent';
    btn.style.border = '1px solid #30363d';
    btn.style.color = '#768390';
    btn.style.cursor = 'pointer';
  });
  
  const submitButtons = document.querySelectorAll('.submit-btn');
  submitButtons.forEach(btn => {
    btn.style.padding = '5px 10px';
    btn.style.borderRadius = '4px';
    btn.style.backgroundColor = '#FFC72C';
    btn.style.color = '#0d1117';
    btn.style.border = 'none';
    btn.style.fontWeight = 'bold';
    btn.style.cursor = 'pointer';
  });
  
  // Style comment inputs
  const commentInputs = document.querySelectorAll('.comment-input');
  commentInputs.forEach(input => {
    input.style.width = '100%';
    input.style.padding = '6px 8px';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid #30363d';
    input.style.backgroundColor = '#0d1117';
    input.style.color = '#adbac7';
    input.style.fontSize = '0.85rem';
  });
  
  // Hide all comment count indicators initially
  document.querySelectorAll('.like-count').forEach(count => {
    if (parseInt(count.textContent) <= 0) {
      count.style.display = 'none';
    }
  });
});
