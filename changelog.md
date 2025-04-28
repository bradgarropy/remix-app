# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog],
and this project adheres to [Semantic Versioning][semver].

<!-- ## [X.Y.Z]
_YYYY-MM-DD_

### Added

-   TODO

### Changed

-   TODO

### Deprecated

-   TODO

### Removed

-   TODO

### Fixed

-   TODO

### Security

-   TODO -->

## [Unreleased]

- _TBD_

## [0.0.21][0.0.21]

_2025-04-28_

- Typed environment variables

## [0.0.20][0.0.20]

_2025-04-25_

- Support TypeScript's [`erasableSyntaxOnly`][erasable-syntax-only] configuration

## [0.0.19][0.0.19]

_2025-04-24_

- Use React [metadata tags][metadata]

## [0.0.18][0.0.18]

_2025-04-22_

- Validate form data and parameters with [`zod`][zod]

## [0.0.17][0.0.17]

_2025-04-21_

- Return errors from actions and display them in forms

## [0.0.16][0.0.16]

_2025-03-07_

- Add end to end test coverage for authentication and notes

## [0.0.15][0.0.15]

_2025-02-27_

- Automate terminals with [vscode tasks][vscode-tasks]

## [0.0.14][0.0.14]

_2025-02-27_

- Integrate [`nodemailer`][nodemailer]
- Send password reset link via email

## [0.0.13][0.0.13]

_2025-02-27_

- Show authenticated user email

## [0.0.12][0.0.12]

_2025-02-26_

- Combine [GitHub Actions][github-actions] into a single `ci` workflow

## [0.0.11][0.0.11]

_2025-02-25_

- Add delete note feature

## [0.0.10][0.0.10]

_2025-02-25_

- Add update note feature

## [0.0.9][0.0.9]

_2025-02-24_

- Add note create page
- Add view notes page

## [0.0.8][0.0.8]

_2025-02-24_

- Implement forgot password flow
- Add delete expired reset tokens script

## [0.0.7][0.0.7]

_2025-02-18_

- Implement session expiration

## [0.0.6][0.0.6]

_2025-02-18_

- Redirect after sign in

## [0.0.5][0.0.5]

_2025-02-11_

- Navigation based on authentication state

## [0.0.4][0.0.4]

_2025-02-11_

- Add authentication routes

## [0.0.3][0.0.3]

_2025-02-10_

- Add authentication utilities

## [0.0.2][0.0.2]

_2025-02-10_

- Integrate [`prisma`][prisma]

## [0.0.1][0.0.1]

_2025-02-04_

- Create repository from [remix-starter][remix-starter]

[keep-a-changelog]: https://keepachangelog.com
[semver]: https://semver.org
[unreleased]: https://github.com/bradgarropy/remix-app/compare/v0.0.21...HEAD
[0.0.21]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.21
[0.0.20]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.20
[0.0.19]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.19
[0.0.18]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.18
[0.0.17]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.17
[0.0.16]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.16
[0.0.15]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.15
[0.0.14]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.14
[0.0.13]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.13
[0.0.12]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.12
[0.0.11]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.11
[0.0.10]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.10
[0.0.9]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.9
[0.0.8]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.8
[0.0.7]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.7
[0.0.6]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.6
[0.0.5]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.5
[0.0.4]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.4
[0.0.3]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.3
[0.0.2]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.2
[0.0.1]: https://github.com/bradgarropy/remix-app/releases/tag/v0.0.1
[remix-starter]: https://github.com/bradgarropy/remix-starter
[prisma]: https://prisma.io
[github-actions]: https://github.com/features/actions
[nodemailer]: https://www.nodemailer.com
[vscode-tasks]: https://code.visualstudio.com/docs/terminal/basics#_automating-terminals-with-tasks
[zod]: https://zod.dev
[metadata]: https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags
[erasable-syntax-only]: https://typescriptlang.org/tsconfig/#erasableSyntaxOnly
