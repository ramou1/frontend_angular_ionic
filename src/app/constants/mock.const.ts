import { TaskModel } from "../models/task-model";
import { UserModel } from "../models/user-model";

export const MOCK_USERS: UserModel[] = [
  {
    id: '101',
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    role: 'user',
    registerDate: new Date('2024-08-01'),
  },
  {
    id: '102',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'admin',
    registerDate: new Date('2024-08-02'),
  },
  {
    id: '103',
    name: 'Carol White',
    email: 'carol.white@example.com',
    role: 'admin',
    registerDate: new Date('2024-07-12'),
  },
  {
    id: '104',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'user',
    registerDate: new Date('2024-08-03'),
  },
  {
    id: '105',
    name: 'Grace Wilson',
    email: 'grace.wilson@gmail.com',
    role: 'user',
    registerDate: new Date('2024-08-01'),
  },
  {
    id: '106',
    name: 'Henry Clark',
    email: 'henry.clark@example.com',
    role: 'user',
    registerDate: new Date('2024-07-23'),
  }
];

export const MOCK_TASKS: TaskModel[] = [
  {
    id: '1',
    title: 'Create landing page',
    description: 'Design and implement a new landing page for the product.',
    expirationDate: new Date('2024-08-15'),
    registerDate: new Date('2024-08-01'),
    status: 1,
    responsibleId: '101',
    responsible: {
      id: '101',
      name: 'Alice Johnson',
      email: 'alice@gmail.com',
    },
  },
  {
    id: '2',
    title: 'Database backup',
    description: 'Perform a full backup of the production database.',
    expirationDate: new Date('2024-08-10'),
    registerDate: new Date('2024-07-29'),
    status: 2,
    responsibleId: '102',
    responsible: {
      id: '102',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
    },
  },
  {
    id: '3',
    title: 'API documentation update',
    description: 'Update the API documentation with the latest endpoints.',
    expirationDate: new Date('2024-08-20'),
    registerDate: new Date('2024-08-02'),
    status: 0,
    responsibleId: '103',
    responsible: {
      id: '103',
      name: 'Carol White',
      email: 'carol.white@example.com',
    },
  },
  {
    id: '4',
    title: 'Performance testing',
    description: 'Run performance tests on the new application release.',
    expirationDate: new Date('2024-08-18'),
    registerDate: new Date('2024-08-03'),
    status: 1,
    responsibleId: '104',
    responsible: {
      id: '104',
      name: 'David Brown',
      email: 'david.brown@example.com',
    },
  },
  {
    id: '5',
    title: 'Code review',
    description: 'Review the pull requests submitted by the development team.',
    expirationDate: new Date('2024-08-12'),
    registerDate: new Date('2024-08-04'),
    status: 2,
    responsibleId: '101',
    responsible: {
      id: '101',
      name: 'Alice Johnson',
      email: 'alice@gmail.com',
    },
  },
  {
    id: '6',
    title: 'Security audit',
    description: 'Conduct a security audit of the web application.',
    expirationDate: new Date('2024-08-25'),
    registerDate: new Date('2024-08-05'),
    status: 0,
    responsibleId: '106',
    responsible: {
      id: '106',
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
    },
  },
  {
    id: '7',
    title: 'User feedback analysis',
    description: 'Analyze user feedback from the last survey.',
    expirationDate: new Date('2024-08-22'),
    registerDate: new Date('2024-08-06'),
    status: 1,
    responsibleId: '104',
    responsible: {
      id: '104',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
    },
  },
  {
    id: '8',
    title: 'UI/UX design review',
    description: 'Review and refine the UI/UX design for the mobile app.',
    expirationDate: new Date('2024-08-30'),
    registerDate: new Date('2024-08-07'),
    status: 0,
    responsibleId: '106',
    responsible: {
      id: '106',
      name: 'Henry Clark',
      email: 'henry.clark@example.com',
    }
  },
  {
    id: '9',
    title: 'Server maintenance',
    description: 'Perform routine maintenance on the application servers.',
    expirationDate: new Date('2024-08-28'),
    registerDate: new Date('2024-08-08'),
    status: 1,
    responsibleId: '102',
    responsible: {
      id: '102',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
    },
  },
  {
    id: '10',
    title: 'Marketing campaign launch',
    description: 'Launch the new marketing campaign for the upcoming product.',
    expirationDate: new Date('2024-09-01'),
    registerDate: new Date('2024-08-09'),
    status: 0,
    responsibleId: '105',
    responsible: {
      id: '106',
      name: 'Henry Clark',
      email: 'henry.clark@example.com',
    }
  }
];
