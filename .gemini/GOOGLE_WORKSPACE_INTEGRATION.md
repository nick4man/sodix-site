# Google Workspace Integration Plan

This document outlines the plan for integrating with Google Workspace to fetch portfolio data.

## 1. Choose the right API

For the portfolio, the **Google Sheets API** is the best fit. We can store project information in a Google Sheet for easy editing by non-technical users.

## 2. Set up a Google Cloud Project

- Create a new project in the Google Cloud Console.
- Enable the Google Sheets API.
- Configure the OAuth consent screen.

## 3. Create Credentials

- Create an **API key** for public read-only access to the Google Sheet. This is the simplest method and doesn't require users to log in.

## 4. Fetch the data

- Use the Google Sheets API to fetch the data from the spreadsheet.
- Use a library like `googleapis` to make this easier.

## 5. Display the data

- Update the `portfolio.tsx` component to display the data fetched from the Google Sheet.
