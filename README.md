Key Features

- Dual-Channel Verification Tracks: Separated validation logic implementations for both an Email OTP process and a 2-minute polling / security pin confirmation flow via Mobile Device Authorization.
- Dynamic State-Driven Views: Utilizes centralized state routing to share transactional feedback states safely.
- Input & Security Protections: Real-time character sanitization (non-digit stripping), dynamic visual countdown clocks, and explicit secure visibility eye-toggles on sensitive password inputs.
- Comprehensive UX Fidelity: Built following professional layout parameters targeting high fidelity across mobile breakpoints (320px–480px) and wide desktop viewports (1200px–1600px).

Technology Stack & Architecture

- Core Library: React (Hooks, state management, and side-effect refs)
- Routing Engine: React Router DOM v6 (BrowserRouter, Routes, Route, Maps)
- Styling Architecture: Semantic HTML5 combined with modular CSS layer isolation (variables.css, layout.css, component.css)

Local Environment Installation & Setup Instructions

1. Clone the Project Repository

git clone [https://github.com/shaam-n/Centrico-UIChallenge.git](https://github.com/shaam-n/Centrico-UIChallenge.git)
cd Centrico-UIChallenge

2. Install Project Dependency Modules

Install the required application dependencies configured in package.json(Note: Git  ignores node_modules/ using .gitignore settings):

npm install

3. Launch the Local Development Server

Execute the start script to boot the environment:

npm start

The application will spin up instantly. Open your browser and navigate to http://localhost:3000 to view the live interface.


 Mock API Behavior Matrix for Evaluation

To accurately test successful routes or trigger defensive form exception workflows, use these hardcoded evaluation rules within the view inputs:

* Email OTP Tracking Path (/reset-email):
* Entering error@mail.com explicitly triggers a missing profile exception string. Any other syntactically valid email completes successfully.
* On the OTP Verification view (/verify-otp), typing 1234 acts as the authorized access code. Any other 4-digit entry throws an explicit invalid code alert.


* Mobile Authentication Path (/reset-mobile):
* In the Mobile Authentication(/verify-mobile), entering the authorization code 7 unlocks. Any other value throws a device mismatch error.


* Password Change Commit Layout (/reset-password):
* Passwords must match exactly and length greater than or equal to 6 characters.
* Entering fail1234 as the newly provided password intentionally breaks a security validation reuse constraint, catch block error handling.
