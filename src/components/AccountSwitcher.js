import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import ActiveImage from './ActiveImage';
import CompanyTitle from './CompanyTitle';
import ChevronIcon from './ChevronIcon';

const GET_COMPANY_TITLE = gql`
  query GetCompanyTitle {
    company {
      title
    }
  }
`;

const AccountSwitcher = () => {
  const { loading, error, data } = useQuery(GET_COMPANY_TITLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="account-switcher">
      <div className="account-switcher-button">
        <ActiveImage />
        <CompanyTitle title={data.company.title} />
        <ChevronIcon />
      </div>
    </div>
  );
};

export default AccountSwitcher;