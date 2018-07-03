import React, { Component } from 'react'; // must be in scope
import { Icon, Dropdown, Menu, Popconfirm, message } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';

import mzLogger from '../helpers/mz-logger';

import {
	delQuote,
	deleteQuote,
} from '../reducers/quote/action';

import style from '../pages/style';

const log = mzLogger('QuoteDropDown');

const DownIcon = styled(Icon)`
	&:hover {
		color: ${style.globalColor.hover};
	}
`;

const MenuItem = Menu.Item;

class QuoteDropDown extends Component {
	deleteQuote() {
		const { id } = this.props;

		this.props.deleteQuote(id)
			.then((res) => {
				this.props.delQuote(res.quote.id);
				message.success('Quote successfully deleted!');
				log.info('set success message, delete quote');
			})
			.catch((err) => {
				log.info('set errors');
				if (!isEmpty(err.message)) message.error(err.message); // global err
			});
	}

	changeEditMode(edit) {
		this.props.changeEditMode(edit);
	}

	render() {
		const ListMenu = (
			<Menu>
				<MenuItem>
					<a
						rel="noopener noreferrer"
						onClick={this.changeEditMode.bind(this, true)}
					>
						Edit
					</a>
				</MenuItem>
				<MenuItem>
					<Popconfirm
						title="Are you sure delete this quote?"
						onConfirm={this.deleteQuote.bind(this)}
						okText="Yes"
						cancelText="No"
					>
						<a
							rel="noopener noreferrer"
						>
							Delete
						</a>
					</Popconfirm>
				</MenuItem>
			</Menu>
		);

		return (
			<Dropdown overlay={ListMenu} trigger={['click']}>
				<DownIcon type="down" className="ant-dropdown-link" />
			</Dropdown>
		);
	}
}

QuoteDropDown.propTypes = {
	delQuote: PropTypes.func.isRequired,
	deleteQuote: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	delQuote: id => dispatch(delQuote(id)),
	deleteQuote,
});

const ConnectedQuoteDropDown = connect(null, mapDispatchToProps)(QuoteDropDown);

export default ConnectedQuoteDropDown;
