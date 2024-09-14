# Leaf & Bloom

Leaf & Bloom is a comprehensive platform for plant enthusiasts, offering a wide range of features from plant shopping to community engagement and expert care advice.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Plant Shopping**: Browse and purchase a wide variety of plants.
- **Community Engagement**: Share your plants, experiences, and tips with other plant lovers.
- **Expert Care Advice**: Access a wealth of information on plant care and maintenance.
- **User Authentication**: Secure sign-up and sign-in functionality.
- **Responsive Design**: Fully responsive web application for seamless use across devices.

## Technologies Used

- React.js
- React Router for navigation
- Framer Motion for animations
- Firebase for authentication and data storage
- Tailwind CSS for styling
- Lucide React for icons
- External API for plant gallery (specify which API if applicable)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/AlMonther9/leaf-and-bloom.git
   ```

2. Navigate to the project directory:
   ```
   cd leaf-and-bloom
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```
   npm start
   ```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You should see the Leaf & Bloom landing page.

## API Reference

Leaf & Bloom uses the Perenual API to fetch plant data. The API interactions are handled in a separate file, typically named api.js. Here's an overview of the available API functions:

- getPlants(page, filters): Fetches a list of plants with optional pagination and filters.
- getPlantDetails(id): Retrieves detailed information about a specific plant.
- searchPlants(query): Searches for plants based on a query string.
- getPestDiseaseList(page, query): Fetches a list of pests and diseases with optional pagination and search.
- getCareGuides(speciesId, page): Retrieves care guides for a specific plant species.
- getFAQs(page, query): Fetches frequently asked questions with optional pagination and search.

All API calls require an API key, which should be stored in the .env file as REACT_APP_API_KEY2.

## Contributing

We welcome contributions to Leaf & Bloom! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any inquiries, please reach out to us at
- AlMonther: ealmonzer667@gmai.com
- Gehad: gehadgamalazzam@gmail.com

---

Visit our live site: [Leaf & Bloom](https://leaf-bloom.vercel.app/)
