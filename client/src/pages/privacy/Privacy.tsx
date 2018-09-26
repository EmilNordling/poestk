import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { colors, media } from '../../constants';
import { Helmet } from 'react-helmet';
import { P, H } from '../../common/text';
import Icon from '../../common/icon';

const Guidelines = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Hero = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 300px;
  padding: 0 10px;
  background: ${colors.mainDarken};
  background-image: linear-gradient(90deg, #1b1d23 20%, #282b35);

  ${media.small`
    height: 180px;
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  justify-content: center;
  height: 10rem;
  font-size: 10rem;
`;

const SplashBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: repeat 108% 103% url(/assets/splash.png);
  background-position: center;
`;

const Content = styled.div`
  max-width: 800px;
  padding: 0 15px;
  margin-top: 40px;
  background: #ffffff;
  color: #8e959c;
  line-height: 3.6rem;
`;

class Register extends Component {
  render() {
    return (
      <Guidelines>
        <Helmet
          title='privacy'
        />
        <Hero>
          <SplashBackground/>
          <IconWrapper>
            <Icon name='logo' />
          </IconWrapper>
        </Hero>
        <Content>
          <H margin weight={500} size={1} color='#535a65'>POESTK PRIVACY POLICY</H>
          <P margin={40}>Last modified: JUNE 29, 2018.</P>

          <H margin weight={500} size={1} color='#535a65'>WELCOME TO POESTK!</H>
          <P margin={40}>Poestk provides a social online platform via the Poestk website (the “Site”), the Poestk application (the “App”) and related Internet services (collectively, the “Service(s)”). The Service is operated by Poestk (the “we” or “us”) for users of the Service (“you”). This Privacy Policy sets forth our policy with respect to information that is collected from visitors to the Site and users of the App and/or the Services. Under applicable law, Poestk is the “data controller” of personal data collected through the Services.</P>

          <H margin weight={500} size={1} color='#535a65'>PERSONAL INFORMATION WE COLLECT</H>
          <P margin={10}>
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.” We collect Device Information using the following technologies:
            <div>- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</div>
            <div>- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</div>
          </P>
          <P margin={40}>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</P>

          <H margin weight={500} size={1} color='#535a65'>HOW DO WE USE YOUR PERSONAL INFORMATION?</H>
          <P margin={40}>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</P>

          <H margin weight={500} size={1} color='#535a65'>YOUR RIGHTS</H>
          <P margin={40}>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</P>

          <H margin weight={500} size={1} color='#535a65'>DO NOT TRACK</H>
          <P margin={40}>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser, as there is no consistent industry standard for compliance.</P>

          <H margin weight={500} size={1} color='#535a65'>CHANGES</H>
          <P margin={40}>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</P>

          <H margin weight={500} size={1} color='#535a65'>CONTACT US</H>
          <P margin={40}>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at poestk@gmail.com</P>
        </Content>
      </Guidelines>
    );
  }
}

export default Register;
