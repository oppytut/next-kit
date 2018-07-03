import React, { Component } from 'react'; // must be in scope
import { Icon, Dropdown, Menu, Modal, message } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';

import mzLogger from '../helpers/mz-logger';

import { delQuote, deleteQuote } from '../reducers/quote/action';

import style from '../pages/style';

const log = mzLogger('QuoteDropDown');

const DownIcon = styled(Icon)`
	&:hover {
		color: ${style.globalColor.hover};
	}
`;

const MenuItem = Menu.Item;

class QuoteDropDown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};
	}

	changeEditMode(edit) {
		this.props.isEditMode(edit);
	}

	showDeleteConfirm() {
		const deleteQuote = this.deleteQuote.bind(this);

		Modal.confirm({
			title: 'Are you sure delete this quote?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteQuote();
			},
		});

		log.info('show delete confirm modal');
	}

	deleteQuote() {
		this.setState({ loading: true });

		const { id } = this.props;

		this.props.deleteQuote(id)
			.then((res) => {
				this.props.delQuote(res.quote.id);
				message.success('Quote successfully deleted!');

				log.info('set success message, quote deleted');
			})
			.catch((err) => {
				if (!isEmpty(err.message)) message.error(err.message); // global err

				log.info('set err response');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	}

	render() {
		const { loading } = this.state;

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
					<a
						rel="noopener noreferrer"
						onClick={this.showDeleteConfirm.bind(this)}
					>
						Delete
					</a>
				</MenuItem>
			</Menu>
		);

		return (
			<Dropdown overlay={ListMenu} trigger={loading ? [] : ['click']}>
				<DownIcon
					type={loading ? 'loading' : 'down'}
					className="ant-dropdown-link"
				/>
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
