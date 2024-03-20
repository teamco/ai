import { stub } from '@/utils/function';

export const costColumns = ({ data, onClick = stub }) => ({
  cost: {
    data,
    columns: [
      {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: 'Last Month Cost (US$)',
        dataIndex: 'month',
        key: 'month'
      },
      {
        title: 'Last Year Cost (US$)',
        dataIndex: 'year',
        key: 'year'
      },
      {
        title: 'ASK Count',
        dataIndex: 'ask',
        key: 'ask'
      },
      {
        title: 'ADD Count',
        dataIndex: 'add',
        key: 'add'
      }
    ]
  }
});