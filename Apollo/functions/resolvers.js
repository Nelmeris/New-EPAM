const { getFromFirestore, addToFirestore, updateOnFirestore, deleteFromFirestore } = require('./firestore');

function createUserFromArgs(args) {
    return {
        name: args.name,
        surname: args.surname,
        phoneNumber: args.phoneNumber,
        email: args.email,
        password: args.password,
        createdAt: args.createdAt,
        typeId: args.typeId
    }
}

function createOrderFromArgs(args) {
    return {
        userId: args.userId,
        typeId: args.typeId,
        description: args.description,
        statusId: args.statusId,
        managerId: args.managerId
    }
}

const resolvers = {
    Query: {
        users: () => getFromFirestore('/users'),
        user: (parent, args) => getFromFirestore('/users', 'id', args.id),
        userByEmail: (parent, args) => getFromFirestore('/users', 'email', args.email),

        userTypes: () => getFromFirestore('/userTypes'),

        orders: () => getFromFirestore('/orders'),
        order: (parent, args) => getFromFirestore('/orders', 'id', args.id),
        orderByUser: (parent, args) => getFromFirestore('/orders', 'userId', args.userId),

        orderTypes: () => getFromFirestore('/orderTypes'),
        orderType: (parent, args) => getFromFirestore('/orderTypes', 'id', args.id),

        orderStatuses: () => getFromFirestore('/orderStatuses'),
        orderStatus: (parent, args) => getFromFirestore('/orderStatuses', 'id', args.id),

        rules: () => getFromFirestore('/rules'),

        userTypeRules: () => getFromFirestore('/userTypeRules')
    },
    Mutation: {
        addUser: (parent, args) =>
        addToFirestore('/users', createUserFromArgs(args)),

        addOrder: (parent, args) =>
        addToFirestore('/orders', createOrderFromArgs(args)),

        updateOrder: (parent, args) =>
        updateOnFirestore('/orders', args.id, createOrderFromArgs(args)),

        addRule: (parent, args) =>
        addToFirestore('/rules', { title: args.title }),

        addUserType: (parent, args) =>
        addToFirestore('/userTypes', { title: args.title }),

        addUserTypeRule: (parent, args) =>
        addToFirestore('/userTypeRules', { ruleId: args.ruleId, userTypeId: args.userTypeId }),
        
        deleteUserTypeRule: (parent, args) =>
        deleteFromFirestore('/userTypeRules', args.id)
    }
}

module.exports = resolvers;