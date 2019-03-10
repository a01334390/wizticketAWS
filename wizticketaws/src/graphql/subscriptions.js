// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePlace = `subscription OnCreatePlace {
  onCreatePlace {
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
export const onUpdatePlace = `subscription OnUpdatePlace {
  onUpdatePlace {
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
export const onDeletePlace = `subscription OnDeletePlace {
  onDeletePlace {
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
export const onCreateWizEvent = `subscription OnCreateWizEvent {
  onCreateWizEvent {
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
export const onUpdateWizEvent = `subscription OnUpdateWizEvent {
  onUpdateWizEvent {
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
export const onDeleteWizEvent = `subscription OnDeleteWizEvent {
  onDeleteWizEvent {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTicket = `subscription OnCreateTicket {
  onCreateTicket {
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
export const onUpdateTicket = `subscription OnUpdateTicket {
  onUpdateTicket {
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
export const onDeleteTicket = `subscription OnDeleteTicket {
  onDeleteTicket {
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
