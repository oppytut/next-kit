import React from 'react'; // must be in scope
import { Card } from 'antd';
import styled from 'styled-components';

import QuoteForm from './quoteForm';

const StyledCard = styled(Card)`
	margin-top: 10px;
`;

const NewQuote = () => (
	<React.Fragment>
		<StyledCard>
			<QuoteForm />
		</StyledCard>
	</React.Fragment>
);

export default NewQuote;
