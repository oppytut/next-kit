import React from 'react'; // must be in scope
import { Card } from 'antd';
import styled from 'styled-components';

import CreateQuoteForm from './quoteForm/createForm';

const StyledCard = styled(Card)`
	margin-top: 10px;
`;

const CreateQuote = () => (
	<React.Fragment>
		<StyledCard>
			<CreateQuoteForm />
		</StyledCard>
	</React.Fragment>
);

export default CreateQuote;
