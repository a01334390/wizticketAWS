// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPlace = `query GetPlace($id: ID!) {
  getPlace(id: $id) {
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
export const listPlaces = `query ListPlaces(
  $filter: ModelPlaceFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      wizevents {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    nextToken
  }
}
`;
export const getWizEvent = `query GetWizEvent($id: ID!) {
  getWizEvent(id: $id) {
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
    seatingConfiguration {
      category
      pricing
    }
  }
}
`;
export const listWizEvents = `query ListWizEvents(
  $filter: ModelWizEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listWizEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
      seatingConfiguration {
        category
        pricing
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      registered
      group
      tickets {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTicket = `query GetTicket($id: ID!) {
  getTicket(id: $id) {
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
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
      seatingConfiguration {
        category
        pricing
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
export const listTickets = `query ListTickets(
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      wizevent {
        id
        name
        description
        createdAt
        owner
        validUntil
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
      }
    }
    nextToken
  }
}
`;
export const searchPlaces = `query SearchPlaces(
  $filter: SearchablePlaceFilterInput
  $sort: SearchablePlaceSortInput
  $limit: Int
  $nextToken: Int
) {
  searchPlaces(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      wizevents {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
    }
    nextToken
  }
}
`;
export const searchWizEvents = `query SearchWizEvents(
  $filter: SearchableWizEventFilterInput
  $sort: SearchableWizEventSortInput
  $limit: Int
  $nextToken: Int
) {
  searchWizEvents(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      }
      tickets {
        nextToken
      }
      pictures {
        bucket
        region
        key
      }
      seatingConfiguration {
        category
        pricing
      }
    }
    nextToken
  }
}
`;
export const searchTickets = `query SearchTickets(
  $filter: SearchableTicketFilterInput
  $sort: SearchableTicketSortInput
  $limit: Int
  $nextToken: Int
) {
  searchTickets(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      wizevent {
        id
        name
        description
        createdAt
        owner
        validUntil
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
      }
    }
    nextToken
  }
}
`;
