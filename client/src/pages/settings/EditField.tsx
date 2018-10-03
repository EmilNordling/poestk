import React, { Component, Fragment } from 'react';
import { observable } from 'mobx';
import styled from 'styled-components';
import Row from '../../common/grid/Row';
import Button from '../../common/button';
import { observer } from 'mobx-react';
import Col from '../../common/grid/Col';
import { H, P } from '../../common/text/index';

interface IEditFieldPropsInfo {
  title: string;
  description: string;
}

interface EditFieldProps {
  onClick: (event: React.FormEvent<HTMLFormElement>) => void;
  info: IEditFieldPropsInfo;
}

const EditFieldStyle = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const ListItem = styled.div`
  padding: 20px 0;
`;

export {
  ListItem,
};

@observer
class EditField extends Component<EditFieldProps> {
  @observable public isOpen = false;

  private handleToggle = () => this.isOpen = !this.isOpen;
  private handleSave = (event: React.FormEvent<HTMLFormElement>) => this.props.onClick(event);

  render() {
    const { children } = this.props;

    return (
      <ListItem>
        <Row justify='space-between'>
          <Col span={10}>
            <H size={3} margin={10}>Profile</H>
            <P>The email is your identity on Poestk.</P>
          </Col>
          <Button onClick={this.handleToggle}>{ this.isOpen ? 'close' : 'expand'}</Button>
        </Row>
        <EditFieldStyle>
          { this.isOpen &&
            <Fragment>
              <Col span={10}>
                {children}
                <Row justify='end'>
                  <Button onClick={this.handleSave}>save</Button>
                </Row>
              </Col>
            </Fragment>
          }
        </EditFieldStyle>
      </ListItem>
    );
  }
}

export default EditField;
