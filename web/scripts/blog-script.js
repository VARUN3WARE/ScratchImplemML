document.addEventListener('DOMContentLoaded', () => {
    // Code highlighting
    function highlightCode() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.innerHTML = block.innerHTML
                .replace(/\b(def|class|import|return|if|else|for|while|in|and|or|not)\b/g, '<span class="keyword">$1</span>')
                .replace(/\b(self|np|df|plt|pd|sklearn)\b/g, '<span class="variable">$1</span>')
                .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>')
                .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
        });
    }
    highlightCode();

    // Animated metrics
    function animateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(metric => {
            const value = parseFloat(metric.textContent);
            let start = 0;
            const duration = 1500;
            const step = value / duration * 10;
            const isPercentage = metric.textContent.includes('%');

            function update() {
                start += step;
                if (start < value) {
                    metric.textContent = start.toFixed(2) + (isPercentage ? '%' : '');
                    requestAnimationFrame(update);
                } else {
                    metric.textContent = isPercentage ? value + '%' : value.toFixed(2);
                }
            }
            requestAnimationFrame(update);
        });
    }
    animateMetrics();

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the target tab and make it active
            const target = button.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Copy code button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-block').querySelector('code');
            const textToCopy = codeBlock.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.color = '';
                }, 2000);
            });
        });
    });

    // Plot control buttons
    const zoomInButtons = document.querySelectorAll('.plot-control-btn[title="Zoom In"]');
    const zoomOutButtons = document.querySelectorAll('.plot-control-btn[title="Zoom Out"]');
    const downloadButtons = document.querySelectorAll('.plot-control-btn[title="Download Plot"]');
    
    zoomInButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plotContainer = button.closest('.plot-container');
            const image = plotContainer.querySelector('img');
            
            if (image) {
                const currentWidth = parseInt(getComputedStyle(image).width);
                image.style.width = (currentWidth * 1.2) + 'px';
                plotContainer.style.overflowX = 'auto';
            }
        });
    });
    
    zoomOutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plotContainer = button.closest('.plot-container');
            const image = plotContainer.querySelector('img');
            
            if (image) {
                const currentWidth = parseInt(getComputedStyle(image).width);
                if (currentWidth > 200) {
                    image.style.width = (currentWidth * 0.8) + 'px';
                }
                
                if (parseInt(getComputedStyle(image).width) <= plotContainer.clientWidth) {
                    plotContainer.style.overflowX = 'hidden';
                    image.style.width = '100%';
                }
            }
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plotContainer = button.closest('.plot-container');
            const image = plotContainer.querySelector('img');
            
            if (image) {
                const link = document.createElement('a');
                link.download = 'plot-visualization.png';
                link.href = image.src;
                link.click();
            }
        });
    });

    // // Placeholder add buttons functionality
    // const addPlotContainers = document.querySelectorAll('.add-plot-container');
    // const addInsightBtn = document.querySelector('.add-insight-btn');
    // const addMetricCard = document.querySelector('.add-metric');
    
    // addPlotContainers.forEach(container => {
    //     container.addEventListener('click', () => {
    //         // This would typically open a file dialog or visualization builder
    //         alert('In a production environment, this would open a file uploader or visualization builder.');
            
    //         // For demo purposes, you could replace with a sample image
    //         // container.innerHTML = '<img src="assets/sample-plot.png" alt="Visualization" class="responsive-plot">';
    //         // container.classList.remove('placeholder-plot', 'add-plot-container');
    //     });
    // });
    
    // addInsightBtn?.addEventListener('click', () => {
    //     const insightsList = document.querySelector('.insights-section ul');
    //     const newInsight = document.createElement('li');
    //     newInsight.innerHTML = '<span class="insight-tag">New</span>Click to edit this new insight...';
        
    //     // Make it editable on click
    //     newInsight.addEventListener('click', function() {
    //         if (!this.getAttribute('contenteditable')) {
    //             this.setAttribute('contenteditable', 'true');
    //             this.focus();
    //         }
    //     });
        
    //     insightsList.appendChild(newInsight);
    // });
    
    // addMetricCard?.addEventListener('click', () => {
    //     const metricsGrid = document.querySelector('.metrics-grid');
    //     const newMetricCard = document.createElement('div');
    //     newMetricCard.className = 'metric-card';
    //     newMetricCard.innerHTML = `
    //         <h3>New Metric</h3>
    //         <p class="metric-value">0.00</p>
    //         <div class="metric-trend positive">
    //             <i class="fas fa-arrow-up"></i> 0.0
    //         </div>
    //     `;
        
    //     // Insert before the add button
    //     metricsGrid.insertBefore(newMetricCard, addMetricCard);
        
    //     // Make the title editable on click
    //     const metricTitle = newMetricCard.querySelector('h3');
    //     metricTitle.addEventListener('click', function() {
    //         if (!this.getAttribute('contenteditable')) {
    //             this.setAttribute('contenteditable', 'true');
    //             this.focus();
    //         }
    //     });
        
    //     // Make the value editable on click
    //     const metricValue = newMetricCard.querySelector('.metric-value');
    //     metricValue.addEventListener('click', function() {
    //         if (!this.getAttribute('contenteditable')) {
    //             this.setAttribute('contenteditable', 'true');
    //             this.focus();
    //         }
    //     });
    // });

    // // Make metrics editable on click
    // document.querySelectorAll('.metric-card h3, .metric-value').forEach(element => {
    //     element.addEventListener('click', function() {
    //         if (!this.getAttribute('contenteditable')) {
    //             this.setAttribute('contenteditable', 'true');
    //             this.focus();
    //         }
    //     });
    // });

    // Sticky header effect
    const header = document.querySelector('.blog-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Update scroll position
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Add support for themes (light/dark toggle) if needed
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
});