import React, { Component } from 'react'; // must be in scope
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';

import mzLogger from '../../helpers/mz-logger';

import QuoteDropDown from './quoteDropDown';
import EditQuoteForm from './forms/editQuote';

import style from '../../pages/style';

const log = mzLogger('Quote');

const DisplayedQuote = styled(Card)`
	margin-top: 10px;
`;

const EditForm = styled(Card)`
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
	font-family: ${style.root.fontFamily};

	&:hover {
		color: ${style.colorHover};
	}
`;

class Quote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
		};
	}

	changeEditMode(edit) {
		this.setState({ edit });

		log.trace(`change edit mode to ${edit}`);
	}

	render() {
		const { content, inventor, id } = this.props;
		const { edit } = this.state;

		const displayedQuote = (
			<DisplayedQuote>
				<Row>
					<Col span={20} offset={2}>
						<Content>{content}</Content>
					</Col>
					<Col span={2} style={{ textAlign: 'right' }}>
						<QuoteDropDown
							id={id}
							isEditMode={this.changeEditMode.bind(this)}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Inventor>{inventor}</Inventor>
					</Col>
				</Row>
			</DisplayedQuote>
		);

		const editForm = (
			<EditForm>
				<EditQuoteForm
					content={content}
					inventor={inventor}
					id={id}
					isEditMode={this.changeEditMode.bind(this)}
				/>
			</EditForm>
		);

		return (
			<React.Fragment>
				{!edit ? displayedQuote : editForm}
			</React.Fragment>
		);
	}
}

export default Quote;
