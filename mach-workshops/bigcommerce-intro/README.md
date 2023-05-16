# How to build application based on BigCommerce

In this session, you will be building an application based on BigCommerce

## Completing the workshop

The simplest way to complete the workshop is by visiting the hosted version at https://epam-js-competency-center.github.io/workshops/bigcommerce-intro/.

## What's Included

This repository includes the following folders:

* `deck`: PDF, PPTX copies of the presentation materials for this workshop.
* `resources`: Any required sample code, policies, or templates needed to complete the workshop.
* `workshop`: A [Hugo](https://gohugo.io) site with instructions for completing the workshop.
* `workshop/static/images`: contains images which will be referenced 

## Running locally

1. Clone this repository
2. [Install Hugo locally](https://gohugo.io/overview/quickstart/).
3. Navigate to the `workshop` directory
4. Launch the website locally with the following command:
    ```bash
    hugo serve
    ```
5. Visit `http://localhost:1313` in your browser and complete the workshop

## How to use template

**config.toml** - contains all configuration for Hugo, modify placeholders there and insert your workshop information

**metadata.yml** - contains information which will be used to search and show for your workshop on aws portal. Modify placeholder values to include data about