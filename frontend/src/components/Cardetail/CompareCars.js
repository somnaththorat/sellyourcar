import React from 'react';
import Navbar from '../Navbar/Navbar.js';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CompareCars = () => {
    return (
        <>
        <Navbar/>
            <Grid container item xs={12} md={12} style={{backgroundColor: "none", paddingRight: '10px', marginTop: '-30px'}}>
                <Accordion style={{ margin: '30px', width: "100%", backgroundColor: "blue" }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Compare</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </>
    )
}

export default CompareCars;
