# Advanced Web Calculator

## Description

This project is a professional-grade, responsive web-based calculator built as part of the AK Infratech Summer Internship 2025 program. The calculator offers a comprehensive set of features with a modern, user-friendly interface that works seamlessly across all devices.

### Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, division
- **Advanced Functions**: Percentage calculations
- **User Experience**: 
  - Calculation history display
  - Responsive design for all screen sizes
  - Keyboard support for desktop users
  - Dark/light theme toggle with persistent preferences
  - Visual feedback on button presses
- **Error Handling**: Robust error detection and user-friendly error messages

## Technologies Used

- **HTML5**: Semantic markup for structure and accessibility
- **CSS3**: 
  - Custom properties (variables) for theming
  - Flexbox and Grid for responsive layouts
  - Transitions and animations for interactive elements
  - Media queries for device adaptation
- **JavaScript (ES6+)**: 
  - Modern JavaScript with strict mode
  - Event delegation for efficient event handling
  - Local storage for saving user preferences
  - Secure calculation methods avoiding eval() security issues

## Project Structure

calculator/
├── index.html      # Main HTML structure

├── styles.css      # All styling and theme definitions

├── script.js       # Calculator logic and interactivity

└── README.md       # Project documentation

## Implementation Details

### Security Considerations
- Avoids direct use of `eval()` for calculations to prevent code injection
- Input validation to ensure only valid mathematical expressions are processed

### Accessibility Features
- Keyboard navigation support
- High contrast theme option
- Semantic HTML structure
- ARIA attributes for screen readers

### Performance Optimizations
- Efficient DOM manipulation
- Debounced event handlers
- Optimized calculation algorithms

## How to Use

1. Open `index.html` in any modern web browser
2. Use mouse clicks or keyboard input to perform calculations:
   - Numbers: 0-9 keys
   - Operations: +, -, *, / keys
   - Equals: Enter key or = key
   - Clear: Escape key
   - Backspace: Backspace key
3. Toggle between dark and light themes using the theme button
4. Use memory functions to store and recall values during complex calculations

## Future Enhancements

- Scientific calculator mode with trigonometric functions
- Calculation history log with the ability to recall previous calculations
- Unit conversion capabilities
- Customizable themes and button layouts

---

Developed by Aryan Bhagwat for AK Infratech Summer Internship 2025