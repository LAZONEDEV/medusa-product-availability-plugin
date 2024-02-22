<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Plugin to manage product availability in medusa
</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Usage](#usage)
  - [Installation](#installation)
  - [Admin Panel](#admin-panel)
  - [Store API References](#store-api-references)
    - [Retrieve list of availabilities](#retrieve-list-of-availabilities)
      - [Query parameters](#query-parameters)
      - [Responses](#responses)
    - [Get Availability By ID](#get-availability-by-id)
      - [Responses](#responses-1)
    - [Check if a product is available on an availability](#check-if-a-product-is-available-on-an-availability)
      - [Route parameters](#route-parameters)
      - [Query parameters](#query-parameters-1)
      - [Responses](#responses-2)
    - [Retrieve product availabilities for an availability](#retrieve-product-availabilities-for-an-availability)
      - [Route parameters](#route-parameters-1)
      - [Responses](#responses-3)
    - [Set availability on a cart](#set-availability-on-a-cart)
      - [Route parameters](#route-parameters-2)
      - [Request body](#request-body)
      - [Responses](#responses-4)
    - [Verify if the cart items match the availability](#verify-if-the-cart-items-match-the-availability)
      - [Route parameters](#route-parameters-3)
      - [Responses](#responses-5)
  - [Types](#types)
    - [GetAvailabilitiesResponseType](#getavailabilitiesresponsetype)
  - [GetAvailabilityResponseType](#getavailabilityresponsetype)
    - [CheckProductAvailableOnAvailabilityResult](#checkproductavailableonavailabilityresult)
    - [GetAvailabilityProductAvailabilitiesResponseType](#getavailabilityproductavailabilitiesresponsetype)
    - [APIOperationResponseType](#apioperationresponsetype)
    - [Availability](#availability)
    - [Cart validation error reference](#cart-validation-error-reference)
- [Start the project for contribution](#start-the-project-for-contribution)
  - [Create environment file](#create-environment-file)
  - [Setup medusa](#setup-medusa)
    - [Run migration](#run-migration)
    - [Side you database](#side-you-database)
    - [Create user](#create-user)
  - [Start medusa](#start-medusa)

## Usage

### Installation

- Run the following command to install

```bash
yarn add medusa-customizable-product-availability
```

- Add the plugin in your medusa plugin list to load it
  Open the `medusa-config.js` locate the `plugins` variable and add these lines

```js
const plugins = [
  // ...
  {
    resolve: "medusa-customizable-product-availability",
    options: {
      enableUI: true, // load the admin part of the plugin
    },
  },
];
```

- Run migrations

```bash
npx medusa migrations run
```

### Admin Panel

In the sidebar of the admin area, you'll find a `Availabilities` menu, which allows you to access the availability management area.

### Store API References

#### Retrieve list of availabilities

<details>
  <summary>
    <code>GET</code>
      <b>store/availabilities</b>
  </summary>

##### Query parameters

> | name       | type     | data type | description                                                                                                  |
> | ---------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------ |
> | page       | optional | number    | The current page of the list. The default is `0`                                                             |
> | limit      | optional | number    | The size of the result                                                                                       |
> | forProduct | optional | string    | Allow to filter and only get availabilities related to a product. `forProduct` must be the id of the product |

##### Responses

> | http code | content-type       | response                                                        |
> | --------- | ------------------ | --------------------------------------------------------------- |
> | `200`     | `application/json` | [GetAvailabilitiesResponseType](#getavailabilitiesresponsetype) |

</details>

#### Get Availability By ID

<details>
  <summary>
    <code>GET</code>
      <b>store/availabilities/{availabilityId}</b>
  </summary>

##### Responses

> | http code | content-type       | response                                                    |
> | --------- | ------------------ | ----------------------------------------------------------- |
> | `200`     | `application/json` | [GetAvailabilityResponseType](#getavailabilityresponsetype) |

</details>

#### Check if a product is available on an availability

<details>
  <summary>
    <code>GET</code>
      <b>products/{productId}/is-available-on</b>
  </summary>

##### Route parameters

> | name      | type    | data type | description                                                |
> | --------- | ------- | --------- | ---------------------------------------------------------- |
> | productId | require | string    | The ID of the product whose availability you wish to check |

##### Query parameters

> | name           | type     | data type | description                               |
> | -------------- | -------- | --------- | ----------------------------------------- |
> | availabilityId | required | string    | The ID of the availability to be checked. |

##### Responses

> | http code | content-type       | response                                                                                |
> | --------- | ------------------ | --------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | [CheckProductAvailableOnAvailabilityResult](#checkproductavailableonavailabilityresult) |

</details>

#### Retrieve product availabilities for an availability

<details>
  <summary>
    <code>GET</code>
      <b>store/availabilities/{availabilityId}/products-availabilities</b>
  </summary>

##### Route parameters

- `availabilityId` the id of the availability

##### Responses

> | http code | content-type       | response                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------- |
> | `200`     | `application/json` | [GetAvailabilityProductAvailabilitiesResponseType](#getavailabilitiesresponsetype) |

</details>

#### Set availability on a cart

<details>
  <summary>
    <code>POST</code>
      <b>store/carts/{cartId}/set-availability</b>

  </summary>

##### Route parameters

- `cartId` the cart identifier on which you wish to define availability

##### Request body

> Must be a JSON object. Ensure that the `Content-Type` header is set `application/json`

> | property       | description                |
> | -------------- | -------------------------- |
> | availabilityId | The id of the availability |

##### Responses

> | http code | content-type       | response                                                                           |
> | --------- | ------------------ | ---------------------------------------------------------------------------------- |
> | `200`     | `application/json` | [GetAvailabilityProductAvailabilitiesResponseType](#getavailabilitiesresponsetype) |

</details>

#### Verify if the cart items match the availability

This endpoint allows you to check whether the cart meets the availability conditions defined.

<details>
  <summary>
    <code>GET</code>
      <b>store/carts/{cartId}/verify-if-matches-availability</b>

  </summary>

##### Route parameters

- `cartId` the cart identifier on which you wish to define availability

##### Responses

> | http code | content-type       | response                                                                         |
> | --------- | ------------------ | -------------------------------------------------------------------------------- |
> | `200`     | `application/json` | [APIOperationResponseType](#apioperationresponsetype)                            |
> | `400`     | `application/json` | [Reed more on cart validation error reference](#cart-validation-error-reference) |

</details>

### Types

#### GetAvailabilitiesResponseType

<details>
  <summary> GetAvailabilitiesResponseType </summary>

```ts
export interface GetAvailabilitiesResponseType {
  data: GetAvailabilitiesResponseData;
}

export interface GetAvailabilitiesResponseData {
  availabilities: Omit<Availability, "availabilityProducts">[];
  totalCount: number;
}
```

</details>

### GetAvailabilityResponseType

<details>
  <summary> GetAvailabilityResponseType </summary>

```ts
export interface GetAvailabilityResponseType {
  data: Omit<Availability, "availabilityProducts">;
}
```

</details>

#### CheckProductAvailableOnAvailabilityResult

<details>
  <summary> CheckProductAvailableOnAvailabilityResult </summary>

```ts
export interface CheckProductAvailableOnAvailabilityResult {
  data: {
    exists: boolean;
  };
}
```

#### GetAvailabilityProductAvailabilitiesResponseType

<details>
  <summary> GetAvailabilityProductAvailabilitiesResponseType </summary>

```ts
export interface GetAvailabilityProductAvailabilitiesResponseType {
  data: AvailabilityProduct[];
}
```

</details>

#### APIOperationResponseType

<details>
  <summary> APIOperationResponseType </summary>

```ts
export interface APIOperationResponseType {
  data: {
    success: boolean;
  };
}
```

</details>

#### Availability

<details>
  <summary> Availability </summary>

```ts
export interface Availability {
  id: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  date: Date;
  availabilityProducts: AvailabilityProduct[];
}

export interface AvailabilityProduct {
  id: string;
  created_at: Date;
  updated_at: Date;
  quantity: number;
  product: Product; // medusa product
}
```

</details>

#### Cart validation error reference

The errors listed here are those related to the validation of the cart in relation to the defined availability.
The validation of the cart is done while completing it.

When a validation error is triggered, the HTTP code of the response is `422`.
And the response is in the form of

```ts
enum CartValidationErrorCode {
  AVAILABILITY_EXPIRED = "AVAILABILITY_EXPIRED",
  AVAILABILITY_INACTIVE = "AVAILABILITY_INACTIVE",
  AVAILABILITY_NOT_SET_ON_CART = "AVAILABILITY_NOT_SET_ON_CART",
  PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY = "PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY",
  PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY = "PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY",
  AVAILABLE_QUANTITY_EXCEEDED = "AVAILABLE_QUANTITY_EXCEEDED",
}

type ErrorResponse {
  message: string;
  code: CartValidationErrorCode;
  payload?: object;
}
```

The `payload` property provides more information about the error, which can be used to provide more edifying information to the user. This property can vary depending on the error.

Error codes details

- `AVAILABILITY_EXPIRED` the date defined on the availability is passed
- `AVAILABILITY_INACTIVE` the availability is disabled by the admin
- `AVAILABILITY_NOT_SET_ON_CART` you don't define an availability on the cart you are trying to complete. See how [here](#set-availability-on-a-cart)
- `PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY` a product of the cart is not defined as available on the availability defined on the cart
  In this case the payload is in this form

```ts
type Payload = {
  productTitle: string; // the title of the product
};
```

- `PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY` the availability quantity defined for the product is out of stock. The payload is in same type as `PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY` error.

- `AVAILABLE_QUANTITY_EXCEEDED` the quantity of products requested for purchase is less than the quantity available according to availability.
  In this case the payload look like this

```ts
type Payload = {
  availableQuantity: number; // the now available quantity
};
```

## Start the project for contribution

### Create environment file

Run the following command to create the environment from example file

```bash
cp .env.template .env
```

> You can keep the environment variables value if you are going to use the
> provided docker compose

### Setup medusa

Before you start medusa setup ensure that you start the database with the following command

```bash
docker compose up
```

#### Run migration

Run the following command to apply migrations

```bash
yarn medusa migrations run
```

#### Side you database

```bash
yarn seed
```

#### Create user

```bash
npx medusa user -e some@email.com -p some-password
```

### Start medusa

```bash
yarn dev
```
