# Contributing to the World Generator

## Development Practices
Contributers to this project should practice Trunk-based development. This is the practice in which developers merge small frequent updates to a core "trunk" or main branch [1](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development).

The motivation for the development of these updates should be traced back to a lone issue, which a branch is created from. The branches should be short lived and as a result of the branche's merge into the trunk, an atomic update to production should be made.

## Passing Pre-commit
As of 03/08/23 linting has been implemented to help maintain good QA and QC practices. To make sure that your contributions do not fail the linting stage please run
```
pre-commit run --all-files
```
before you commit / push your commits to the repository.

## CI/CD
As of 03/08/23 an initial pipline has been implemented, please [read](https://gitlab.ecs.vuw.ac.nz/mamoonil/world-gen/-/blob/25-update-documentation/Documentation/CI/CD.md) this to familiarize yourself with the pipline.

The following pre-commit hooks are being used for the project. Have a [read](https://github.com/pre-commit/pre-commit-hooks) to see what your contributions should look like in order to pass the pipeline.

1. check-yaml
2. check-added-large-files
3. check-shebang-scripts-are-executable
4. end-of-file-fixer
5. trailing-whitespace
6. check-json

## Merge Request Reviews
Below is a description of the types of labels assigned to Merge requests. These labels help to keep track of the state of a merge request :

**MR::WIP**

Work in progress - don't review yet.
Responsibility: Author

**MR::Review**

The MR is ready for initial code review, or fixes have been made to the MR after review.
Responsibility: Author

**MR::Changes Requested**

The reviewer has read over the MR, and has indicated that there are parts that need fixing up.
Responsibility: Reviewer

**MR::Ready for Merge**

The reviewer has read over the MR, and has approved the MR for merge.
Responsibility: Reviewer

Merge requests should be the central place for discussions regarding development rather than the issue it was created from.

# Commit Messages
We won't enforce a particular style of commit messages but commit messages should be written as described in [this](https://cbea.ms/git-commit/) article.
