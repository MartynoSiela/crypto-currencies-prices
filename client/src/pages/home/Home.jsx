/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PageContainer from 'components/pageContainer/PageContainer';
import { Grid, Typography } from '@mui/material';
import styles from './Home.module.css';

const renderLink = (link, name) => (
  <a href={link} target="_blank" rel="noreferrer">{name}</a>
);

function Home() {
  return (
    <PageContainer title="Welcome">
      <Grid container justifyContent="center" className={styles.Container}>
        <Grid item xs={10} md={8} className={styles.Content}>
          <Typography variant="h6">Project Description</Typography>
          <p>This is an app than can be used to get historical prices of various crypto currencies.</p>
          <p>The app uses {renderLink('https://github.com/ccxt/ccxt', 'ccxt')} library
            to get both the list of the currencies and also the historical prices for each of the currencies.
          </p>
          <p>The prices are returned by the <strong>fetchOHLCV</strong> method
            which is supported not by all exchanges in the <i>ccxt</i> library.
            There is a list of {renderLink('https://docs.ccxt.com/#/Exchange-Markets', 'supported exchanges')} however
            even from this list, some exchanges do not fully support the fetchOHLCV method.
          </p>
          <p>
            <s>By trial and error {renderLink('https://www.bybit.com/', 'Bybit')} exchange was chosen for this task.</s>
            {renderLink('https://www.mexc.com/', 'MEXC Global')} was chosen as <i>Bybit</i> was being blocked by CloudFront.
          </p>
          <p>fetchOHLCV method also cannot be used on options so these are filtered out
            when generating suggestions as the user is searching for a currency.
          </p>
          <Typography variant="h6">Known Issues</Typography>
          <p>Here is a list of known issues that could be improved in this app:</p>
          <ul>
            <li>Prices graph does not adapt theme colors and text cannot be read when using dark theme.</li>
            <li>Date picker elements have typing disabled because when user starts typing
              a very long validation error messege is displayed which breaks the layout
            </li>
            <li>Website responsiveness could be improved in some places</li>
            <li>Currency input is bigger than the date pickers when simulating devices</li>
          </ul>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Home;
