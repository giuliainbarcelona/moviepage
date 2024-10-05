# Movie List Webpage - Beacon Team

## Introduction

This project is a single-page application that displays movie listings sourced from the IMDb datasets. Users can view detailed information about each movie, including the title, genre, year, rating, runtime, a link to the respective IMDb page, and the movie's poster. The application allows for sorting and filtering of movies, making it easy for users to find specific titles based on their preferences.

## Features

**Movie Information Display:** Shows essential details for each movie:

- Title
- Genre
- Year
- Rating
- Runtime (Duration)
- Movie poster image
- Link to the IMDb page

**Sorting Options:** Users can sort the movie listings by:

- Runtime (Duration)
- Year
- Rating
- Title

For each sorting option, users have the flexibility to order movies in either ascending or descending mode. For instance, when a user selects "Year," they can choose to display movies from the most recent to the oldest or vice versa. This feature enhances the browsing experience by allowing users to customize how they view the movie listings according to their preferences.

**Filtering Options:** Allows users to filter movies based on:

- Genre
- Runtime
- Title

Users can apply one filter option or combine multiple filters to refine their search preferences. This allows for more specific queries, enabling users to find exactly what they’re looking for.

**Combined Filtering and Sorting:** Users can seamlessly combine filtering options with sorting options, providing a powerful way to customize their movie search.

## Technologies and Tools Used

- **React (Vite):** I chose Vite for its fast build times and efficient development environment. Using React’s component-based architecture, I built reusable UI elements, making the project maintainable and easy to update. Vite helped establish the project structure quickly. This approach enabled the development of dynamic features like movie listings, filters, and sorting options, enhancing the overall user experience.

- **Material-UI:**

  - **Why:** I chose Material-UI to take advantage of its comprehensive library of pre-designed components, which facilitates efficient development while adhering to best design practices. By utilizing this framework, I ensured a consistent and responsive user interface that aligns with Material Design guidelines.
  - **Where:** Material-UI components were strategically integrated throughout the application, including the navbar, footer, menu, pagination, and movie card displays. This not only enhanced the overall user experience but also contributed to a polished and professional interface.

- **API Integration:**

  - **Why:** I implemented an API call to the OMDB API to fetch movie poster images, as requested in the core functionality of the challenge. This integration allows users to see the actual posters associated with each title, providing a more engaging and informative browsing experience.
  - **Where:** The API call is made in the main component during the data-fetching process, utilizing a valid IMDb ID obtained from the title.basics dataset. This approach ensures that each movie’s poster is dynamically loaded and displayed alongside its details. In cases where the image is not found, I implemented a default movie poster image to maintain a consistent user interface and prevent any visual gaps in the listings.

- **IMDb Downloadable Dataset:**
  The dataset was utilized from the outset to establish the project's data structure and organization. From the title.basics.tsv.gz file, I extracted essential information such as the title from the primaryTitle column, genre from the genres column, year from the startYear column, and runtime (duration) from the runtimeMinutes column. This dataset also includes the unique identifier tconst, which is crucial for linking to title.ratings.tsv.gz. Using this identifier, I accessed the ratings data and retrieved the rating from the averageRating column.

- **D3 DSV:**
  To handle the data, I used D3 DSV (Delimiter-Separated Values), which simplifies the process of loading and parsing data from the TSV files. D3 DSV provides convenient methods for reading the datasets and transforming them into structured JavaScript objects. From these JavaScript objects, I was able to utilize the data within my code and display it effectively in the application.

## Future Improvements

To enhance the application further, several improvements can be implemented:

- **State Management:** Incorporating React Context will allow for more effective management of application state.
- **Type Safety:** Adopting TypeScript will enhance code reliability and maintainability by providing type safety. This will help catch errors during development and make the codebase easier to understand.
- **Unit Testing:** Implementing unit tests will ensure the reliability of features and components. This practice will help identify bugs early in the development process and improve confidence in the code.
- **Component Breakdown:** Breaking down larger components into smaller, more focused ones will enhance code readability and reusability. This modular approach will make it easier to manage and update the application as it evolves.
