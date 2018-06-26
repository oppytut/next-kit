import React, { Component } from 'react'; // must be in scope
import { Card } from 'antd';
import styled, { injectGlobal } from 'styled-components';

import nunitoSansFont from '../static/fonts/NunitoSans/NunitoSans-Regular.ttf';
import flamencoFont from '../static/fonts/Flamenco/Flamenco-Regular.ttf';

import style from '../pages/style';

injectGlobal`
	@font-face {
		font-family: NunitoSans-Regular;
		src: url('${nunitoSansFont}');
	}
	@font-face {
		font-family: Flamenco-Regular;
		src: url('${flamencoFont}');
	}
`;

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
		const { content, inventor } = this.props;

		return (
			<React.Fragment>
				<StyledCard>
					<Content>
						{content}
					</Content>
					<Inventor>
						{inventor}
					</Inventor>
				</StyledCard>
			</React.Fragment>
		);
	}
}

export default Quote;
