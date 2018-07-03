import React from 'react'; // must be in scope
import { Card } from 'antd';
import styled from 'styled-components';

import AddQuoteForm from './forms/addQuote';

const StyledCard = styled(Card)`
	margin-top: 10px;
`;

const AddQuote = () => (
	<React.Fragment>
		<StyledCard>
			<AddQuoteForm />
		</StyledCard>
	</React.Fragment>
);

export default AddQuote;
