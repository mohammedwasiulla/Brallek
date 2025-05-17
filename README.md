Braille Auto-Correct System Documentation
Project Overview
This Braille Auto-Correct System is a specialized tool designed to assist users in learning and practicing Braille using standard QWERTY keyboards. The system provides real-time suggestions and auto-corrections for Braille input patterns, making it easier for beginners to learn Braille and for experienced users to type more efficiently.
Objectives Fulfilled
1. Real-Time Word Suggestion
✅ Implemented: The system successfully suggests the closest possible word based on entered Braille patterns in real-time, providing immediate feedback as users type.
2. Error Handling
✅ Implemented: The system handles typos and input errors effectively using the Levenshtein distance algorithm, identifying and suggesting corrections when users make mistakes in their Braille sequences.
3. Efficient Algorithm Implementation
✅ Implemented: The Levenshtein distance algorithm has been optimized for efficiency, allowing for quick comparisons between user input and dictionary entries, with a configurable tolerance threshold.
4. User-Friendly Interface
✅ Implemented: The system features a clean, intuitive interface with both virtual and physical keyboard input options, real-time translation, and clear visual feedback.
Innovations Beyond Requirements
1. Responsive Design
The application features a fully responsive design that works well across different screen sizes and devices, enhancing accessibility for all users.
2. Dark/Light Theme Toggle
A theme toggle feature provides users with both dark and light mode options, reducing eye strain in different lighting conditions and allowing personalization.
3. Welcome Page Integration
A professionally designed welcome page introduces new users to the system, highlighting key features and providing a smooth onboarding experience before redirecting to the main application.
4. Visual Keyboard Interface
The virtual Braille keyboard with clickable keys provides an alternative input method, making the system accessible to users who prefer mouse interaction over keyboard input.
5. Theme Persistence
The system remembers user theme preferences using local storage, enhancing user experience by maintaining consistency between sessions.
6. Enhanced Word Suggestions
The system not only identifies similar words but displays them prominently, allowing users to click on suggestions to accept them - streamlining the correction process.
7. Real-Time Translation Display
All translations appear instantly in a dedicated output field, providing immediate feedback and reinforcing the learning process.
Technical Implementation
Algorithms

Levenshtein Distance: Implemented for calculating string similarity with a threshold of 2, providing a balance between accuracy and flexibility
String Cleaning: Input validation ensures only valid Braille characters (s, d, f, j, k, l, space) are accepted

Dictionary Structure

The dictionary is implemented as an array of objects with "text" and "braille" properties
Current dictionary contains 22 common words with their corresponding Braille patterns
The structure allows for easy dictionary expansion

Event Handling

Real-time input monitoring with event listeners for both physical and virtual keyboard input
Immediate suggestion and translation updates triggered by input changes

Theme Management

Theme preferences stored in localStorage for persistence between sessions
Dynamic CSS transitions for smooth theme switching

Future Enhancement Opportunities

Expandable dictionary with user-added custom words
Adjustable error tolerance based on word length or user skill level
Learning mode with guided exercises and progress tracking
Statistical analysis of common user errors to provide targeted feedback
Support for additional Braille formats beyond the current QWERTY mapping
