<h1 align="center">
<br>
MART
<br>
</h1>

<h4 align="center">A sample retail demo application built on top of <a href="https://developer.ncrcloud.com" target="_blank">NCR's APIs.</a></h4>

<p align="center">
<img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg" alt="Dependencies" />
<a href="https://github.com/kg185155/sample-app-retail-demo/issues"><img src="https://img.shields.io/github/issues/kg185155/sample-app-retail-demo" alt="Github Issues" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-orange.svg" alt="Contributions Welcome" />
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-Apache 2.0-brightgreen" alt="License" /></a>
</p>

<p align="center">
<a href="#features">Features</a> //
<a href="#overview">Overview</a> //
<a href="#how-to-use">How to Use</a> //
<a href="#support">Supprt & Contributions</a> //
<a href="#license">License</a>

## Features

- Catalog API Integration
- User registration/authentication
- Adding to/viewing Cart
- Management of Sites
- Management of Categories & Catalog
- Singular store management
- Catalog Search

## Overview

MART integrates with multiple NCR APIs including [Catalog](https://developer.ncrcloud.com/portals/dev-portal/api-explorer/details/8717/documentation), [Sites](https://developer.ncrcloud.com/portals/dev-portal/api-explorer/details/8849/documentation?proxy=bsp-site-site-v1&path=post_sites), [Security](https://developer.ncrcloud.com/portals/dev-portal/api-explorer/details/8302/documentation?proxy=bsp-core-security&path=post_authentication), & [Provisioning](https://developer.ncrcloud.com/portals/dev-portal/api-explorer/details/8306/documentation?proxy=bsp-core-provisioning&path=post_configuration-sets). The demo application showcases one possible way to utilize one or many of the available APIs.

This repository showcases an imaginary retail company with multiple stores in different location. The company can be configured globally as well as at the individual store level.

## How to Use

### Getting Started

First, clone the repository for local development.

Secondly, rename `.env copy.local` to `.env.local` and update `REACT_APP_BSP_SECRET_KEY`, `REACT_APP_BSP_ORGANIZATION`, `REACT_APP_BSP_SHARED_KEY` with data found in the [NCR Developer Portal](https://developer.ncrcloud.com).

Next, install all the packages with

```bash
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
> To learn more about Next.js, visit the [Next.js Documentation](https://nextjs.org/docs).

## Support & Contributions

Feel free to open an issue.

## License

This sample app project is released under the Apache 2.0 license. The license's full text can be found [here](./LICENSE).
