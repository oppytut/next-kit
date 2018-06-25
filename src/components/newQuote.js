import React, { Component } from 'react'; // must be in scope
import { Card } from 'antd';
import styled from 'styled-components';

// import mzLogger from '../libs/mz-logger';

import QuoteForm from './quoteForm';

// const log = mzLogger('NewQuote');

const StyledCard = styled(Card)`
	margin-top: 10px;
`;

class NewQuote extends Component {
	render() {
		return (
			<React.Fragment>
				<StyledCard>
					<QuoteForm />
				</StyledCard>
			</React.Fragment>
		);
	}
}

export default NewQuote;
