import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { AuthStore } from '../stores';
import { Row, Col } from '../common/grid';

const NavRowStyle = styled.div`
  margin-top: 40px;
`;

const Link = styled(RouterLink)`
  font-size: 1.6rem;
`;

interface NavProps extends RouteComponentProps<any> {
  links: Array<{
    linkTo: string,
    value: string,
  }>;
  authStore?: AuthStore;
}

const NavRow: React.SFC<NavProps> = (props) => {
  const { authStore, location, links } = props;

  const spanSize = 24 / links.length;

  return (
    <NavRowStyle>
      <Row gutter={8}>
        {
          links.map((linkObj, index) => (
            <Col key={index} span={spanSize}>
              <Link to={linkObj.linkTo}>{linkObj.value}</Link>
            </Col>
          ))
        }
      </Row>
    </NavRowStyle>
  );
};

export default withRouter(inject('authStore')(observer(NavRow)));
