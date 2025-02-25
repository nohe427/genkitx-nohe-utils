# Repsoitory TypeScript Style Guide

# Introduction
This style guide outlines the coding conventions for Typescript code developed in this repository.

# Key Principles
* **Readability:** Code should be easy to understand for all team members.
* **Maintainability:** Code should be easy to modify and extend.
* **Consistency:** Adhering to a consistent style across all projects improves
  collaboration and reduces errors.
* **Performance:** While readability is paramount, code should be efficient.

## Line Length
* **Maximum line length:** 80 characters.
    * Modern screens allow for wider lines, improving code readability in many cases.
    * Many common patterns in our codebase, like long strings or URLs, often exceed 80 characters.

## Indentation
* **Use 4 spaces per indentation level.**

## Imports
* **Group imports:**
    * Standard library imports
    * Related third party imports
    * Local application/library specific imports
* **Import order within groups:**  Sort alphabetically.

## Comments
* **Write clear and concise comments:** Explain the "why" behind the code, not just the "what".
* **Comment sparingly:** Well-written code should be self-documenting where possible.
* **Use complete sentences:** Start comments with a capital letter and use proper punctuation.

## Logging
* **Log at appropriate levels:** DEBUG, INFO, WARNING, ERROR, CRITICAL
* **Provide context:** Include relevant information in log messages to aid debugging.

## JSDoc
* All functions should contain a JSDoc with the appropriate information.
