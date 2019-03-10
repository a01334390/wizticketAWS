// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPlace = `mutation CreatePlace($input: CreatePlaceInput!) {
  createPlace(input: $input) {
    id
    name
    description
    bookingCost
    address {
      city
      country
      address_line1
      address_state
      address_zip
    }
    seatingConfiguration {
      category
      capacity
      pricing
    }
    owner
    wizevents {
      items {
        id
        name
        description
        createdAt
        owner
        validUntil
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const updatePlace = `mutation UpdatePlace($input: UpdatePlaceInput!) {
  updatePlace(input: $input) {
    id
    name
    description
    bookingCost
    address {
      city
      country
      address_line1
      address_state
      address_zip
    }
    seatingConfiguration {
      category
      capacity
      pricing
    }
    owner
    wizevents {
      items {
        id
        name
        description
        createdAt
        owner
        validUntil
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const deletePlace = `mutation DeletePlace($input: DeletePlaceInput!) {
  deletePlace(input: $input) {
    id
    name
    description
    bookingCost
    address {
      city
      country
      address_line1
      address_state
      address_zip
    }
    seatingConfiguration {
      category
      capacity
      pricing
    }
    owner
    wizevents {
      items {
        id
        name
        description
        createdAt
        owner
        validUntil
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const createWizEvent = `mutation CreateWizEvent($input: CreateWizEventInput!) {
  createWizEvent(input: $input) {
    id
    name
    description
    createdAt
    owner
    validUntil
    place {
      id
      name
      description
      bookingCost
      address {
        city
        country
        address_line1
        address_state
        address_zip
      }
      seatingConfiguration {
        category
        capacity
        pricing
      }
      owner
      wizevents {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const updateWizEvent = `mutation UpdateWizEvent($input: UpdateWizEventInput!) {
  updateWizEvent(input: $input) {
    id
    name
    description
    createdAt
    owner
    validUntil
    place {
      id
      name
      description
      bookingCost
      address {
        city
        country
        address_line1
        address_state
        address_zip
      }
      seatingConfiguration {
        category
        capacity
        pricing
      }
      owner
      wizevents {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const deleteWizEvent = `mutation DeleteWizEvent($input: DeleteWizEventInput!) {
  deleteWizEvent(input: $input) {
    id
    name
    description
    createdAt
    owner
    validUntil
    place {
      id
      name
      description
      bookingCost
      address {
        city
        country
        address_line1
        address_state
        address_zip
      }
      seatingConfiguration {
        category
        capacity
        pricing
      }
      owner
      wizevents {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    registered
    group
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    email
    registered
    group
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    email
    registered
    group
    tickets {
      items {
        id
        category
        seat
        value
      }
      nextToken
    }
  }
}
`;
export const createTicket = `mutation CreateTicket($input: CreateTicketInput!) {
  createTicket(input: $input) {
    id
    wizevent {
      id
      name
      description
      createdAt
      owner
      validUntil
      place {
        id
        name
        description
        bookingCost
        owner
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    category
    seat
    value
    owner {
      id
      username
      email
      registered
      group
      tickets {
        nextToken
      }
    }
  }
}
`;
export const updateTicket = `mutation UpdateTicket($input: UpdateTicketInput!) {
  updateTicket(input: $input) {
    id
    wizevent {
      id
      name
      description
      createdAt
      owner
      validUntil
      place {
        id
        name
        description
        bookingCost
        owner
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    category
    seat
    value
    owner {
      id
      username
      email
      registered
      group
      tickets {
        nextToken
      }
    }
  }
}
`;
export const deleteTicket = `mutation DeleteTicket($input: DeleteTicketInput!) {
  deleteTicket(input: $input) {
    id
    wizevent {
      id
      name
      description
      createdAt
      owner
      validUntil
      place {
        id
        name
        description
        bookingCost
        owner
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    category
    seat
    value
    owner {
      id
      username
      email
      registered
      group
      tickets {
        nextToken
      }
    }
  }
}
`;
