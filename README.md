<h1 align="center">
<br>
<a href="https://retaildemo.ncrcloud.com" target="_blank"><img src="./public/mart-banner.png" alt="MART" height="auto" width="100%" /></a>
<br>
</h1>

<h4 align="center">A sample retail demo application built on top of <a href="https://developer.ncrcloud.com" target="_blank">NCR's APIs.</a></h4>

<p align="center">
<a href="https://retaildemo.ncrcloud.com/"><img src="https://img.shields.io/badge/-Visit%20Demo-blue" alt="Demo" /></a>
<img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg" alt="Dependencies" />
<a href="https://github.com/NCR-Corporation/ncr-retail-demo/issues"><img src="https://img.shields.io/github/issues/NCR-Corporation/ncr-retail-demo" alt="Github Issues" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-orange.svg" alt="Contributions Welcome" />
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-Apache 2.0-brightgreen" alt="License" /></a>
</p>

<p align="center">
<a href="https://retaildemo.ncrcloud.com/" target="_blank">Demo</a> //
<a href="#features">Features</a> //
<a href="#overview">Overview</a> //
<a href="#how-to-use">How to Use</a> //
<a href="#support">Support</a> //
<a href="/CONTRIBUTING.md">Contributing</a> //
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

This repository showcases an imaginary retail company with multiple stores in different location. The company can be managed globally as well as at the individual store level.

## How to Use

🚧 **Important Note** 🚧

If this is the **first time** using a project with the generated keys, you will most likely **not see any data**. Why? When using the Try It Out feature, each application is a fresh installation with no data. See [Seed the Database](#seeding-the-database) to populate the database with test data.

### Getting Started

First, clone the repository for local development.

```bash
git clone https://github.com/NCR-Corporation/ncr-retail-demo.git
```

Secondly, open the repository in an editor and rename `.env copy.local` to `.env.local`.

After renaming, open `.env.local` and update the variables `REACT_APP_BSP_SECRET_KEY`, `REACT_APP_BSP_ORGANIZATION`, `REACT_APP_BSP_SHARED_KEY` with data found in the [NCR Developer Portal](https://developer.ncrcloud.com). To learn more about receiving access, create an account on the [NCR Developer Portal](https://developer.ncrcloud.com) and visit the [Try It Out Documentation](https://developer.ncrcloud.com/portals/dev-portal/help-center/topics?topic=Try%20It%20Out%20Feature).

Next, install all npm packages in the project directory:

```bash
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the sample demo application _generated with your keys._

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
> To learn more about Next.js, visit the [Next.js Documentation](https://nextjs.org/docs).

### Seeding the Database

Every new application built with NCR is a blank installation with no data. If you are looking to become familiar with the APIs and see the application in action locally, you will need to either:

1. Create your own Sites, Categories, Groups, and Catalog
2. Seed the database.

To seed the database, visit the [Admin Dashboard](http://localhost:3000/admin/dashboard) by clicking "⚙ Manage" in the top of the homepage or visiting `/admin/dashboard`. From there, near the top is a blue button "⬇ Build Sample Database". Note, you will still have to have a valid Organization, Secret, and Shared key in your `.env.local`.

## Support

Feel free to open an issue! If there are any bugs you find or any features you would like to see implemented, create the appropriate issue on the repository.

## License

This sample app project is released under the Apache 2.0 license. The license's full text can be found [here](./LICENSE).
