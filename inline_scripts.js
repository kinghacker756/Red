
          // Set default selected price
          let selectedPrice = '0';
          let packageDetails = {
            '140': {
              title: 'iPhone 16 Pro Max - Basic Package',
              price: '99',
              storage: '256GB'
            },
            '160': {
              title: 'iPhone 16 Pro Max - Premium Package',
              price: '0',
              storage: '512GB'
            },
            '180': {
              title: 'iPhone 16 Pro Max - Ultimate Package',
              price: '0',
              storage: '1TB'
            }
          };
          
          function showDescription(descId) {
            // Hide all descriptions first
            const descriptions = document.querySelectorAll('.iphone-description');
            descriptions.forEach(desc => {
              desc.style.display = 'none';
            });
            
            // Remove active class from all buttons
            const buttons = document.querySelectorAll('.cta-btn-iphone');
            buttons.forEach(btn => {
              btn.classList.remove('active');
            });
            
            // Show the selected description
            const selectedDesc = document.getElementById(descId);
            if (selectedDesc) {
              selectedDesc.style.display = 'block';
              
              // Extract the price from the description ID
              selectedPrice = descId.split('-')[1];
              
              // Update Buy Now button href with proper parameters
              const buyButton = document.getElementById('iphone-buy-button');
              if (buyButton) {
                const details = packageDetails[selectedPrice];
                const params = new URLSearchParams();
                params.append('title', details.title);
                params.append('price', details.price);
                params.append('value', details.storage);
                params.append('flag', 'iPhone_16_Pro_Max.png');
                
                buyButton.href = selectedPrice + '$-order.php?' + params.toString();
              }
              
              // Add active class to the clicked button
              const buttonId = 'iphone-btn-' + selectedPrice;
              const activeButton = document.getElementById(buttonId);
              if (activeButton) {
                activeButton.classList.add('active');
              }
            }
          }
          
          // Initialize the first option as selected
          document.addEventListener('DOMContentLoaded', function() {
            showDescription('desc-140');
          });
        

/* ===== INLINE JAVASCRIPT ===== */


    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('open');
      });
    });
  

/* ===== INLINE JAVASCRIPT ===== */


  // Function to handle reactions (likes, etc)
  function handleReaction(btn) {
    btn.classList.toggle('active');
    const span = btn.querySelector('span');
    let count = parseInt(span.textContent);
    
    // Increment or decrement count based on active state
    if (btn.classList.contains('active')) {
      count++;
    } else {
      count--;
    }
    
    // Update the count
    span.textContent = count;
  }
  
  // Function to show comment form
  function showCommentForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = 'block';
    form.querySelector('.comment-input').focus();
  }
  
  // Function to hide comment form
  function hideCommentForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = 'none';
    form.querySelector('.comment-input').value = '';
  }
  
  // Function to submit a comment
  function submitComment(formId) {
    const form = document.getElementById(formId);
    const input = form.querySelector('.comment-input');
    const comment = input.value.trim();
    
    if (comment) {
      // Create comment element
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
      
      // Insert comment before form
      form.parentNode.insertBefore(commentBox, form);
      
      // Hide form
      hideCommentForm(formId);
    }
  }
