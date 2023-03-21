import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Table, Thead, Tr, Th, chakra, Tbody, Td } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { convertTimestamp } from '../helpers/TimeReader';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { handleDeleteClick } from './SampleHelper.js/handleEditDelete';

export default function Sampletable({ samples, folderName, folder_id }) {
	let history = useNavigate();

	const handleDelete = async (id) => {
		console.log(id, '{{{{{S}}}}}');
		try {
			let result = await handleDeleteClick(id);
			console.log(result);
			history(`/homepage/${folderName}/${folder_id}`);
			window.location.reload();
			return; //question 1) why do i have to reload to get back to home
		} catch (err) {
			console.error(err);
		}
	};

	const data = useMemo(
		() =>
			samples.map((s) => ({
				sample_id: s.sample_id,
				common_name: s.common_name,
				scientific_name: s.scientific_name,
				quantity: s.quantity,
				location: s.location,
				image_url: s.image_url,
				note: s.note,
				timestamp: convertTimestamp(s.timestamp)
			})),
		[ samples ]
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Actions',
				accessor: 'actions',
				Cell: ({ row }) => (
					<DeleteIcon
						onClick={() => {
							handleDelete(row.original.sample_id);
						}}
					/>
				)
			},
			{
				Header: 'Sample ID',
				accessor: 'sample_id',
				isNumeric: true
			},
			{
				Header: 'Common Name',
				accessor: 'common_name'
			},
			{
				Header: 'Scientific Name',
				accessor: 'scientific_name'
			},
			{
				Header: 'Quantity',
				accessor: 'quantity',
				isNumeric: true
			},
			{
				Header: 'Location',
				accessor: 'location'
			},
			{
				Header: 'Image URL',
				accessor: 'image_url'
			},
			{
				Header: 'Note',
				accessor: 'note'
			},
			{
				Header: 'Timestamp',
				accessor: 'timestamp',
				isNumeric: true
			}
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

	return (
		<Table {...getTableProps()}>
			<Thead>
				{headerGroups.map((headerGroup) => (
					<Tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
								{column.render('Header')}
								<chakra.span pl="4">
									{column.isSorted ? column.isSortedDesc ? (
										<TriangleDownIcon aria-label="sorted descending" />
									) : (
										<TriangleUpIcon aria-label="sorted ascending" />
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<Tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
									{cell.render('Cell')}
								</Td>
							))}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
}
