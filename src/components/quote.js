import React, { Component } from 'react'; // must be in scope
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';

import style from '../pages/style';

import QuoteDropDown from './quoteDropDown';

const StyledCard = styled(Card)`
	margin-top: 10px;
`;

const Content = styled.div`
	font-family: Flamenco-Regular;
	font-size: 26px;
	letter-spacing: 0.5px;
	text-align: center;
`;

const Inventor = styled.div`
	margin-top: 15px;
	font-size: 12px;
	text-align: center;
	font-family: ${style.body.fontFamily};

	&:hover {
		color: ${style.globalColor.hover};
	}
`;

class Quote extends Component {
	render() {
		const { content, inventor, id } = this.props;

		return (
			<React.Fragment>
				<StyledCard>
					<Row>
						<Col span={20} offset={2}>
							<Content>{content}</Content>
						</Col>
						<Col span={2} style={{ textAlign: 'right' }}>
							<QuoteDropDown id={id} />
						</Col>
					</Row>
					<Row>
						<Col>
							<Inventor>{inventor}</Inventor>
						</Col>
					</Row>
				</StyledCard>
			</React.Fragment>
		);
	}
}

export default Quote;
