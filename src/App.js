import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "./components/dialog";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import _ from "lodash";

const initialValue = {
	name: "",
	email: "",
	phone: "",
	dob: "",
};
const App = () => {
	const [gridApi, setGridApi] = useState(null);
	const [tableData, setTableData] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = useState(initialValue);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const onChange = (e) => {
		const { value, id } = e.target;
		// console.log(value, id);
		// a great way to change the state of a from gorup where you change only the value at the particlar id where change is happening
		setFormData({ ...formData, [id]: value });
	};

	const handleClose = () => {
		setOpen(false);
		setFormData(initialValue);
	};

	const url = "http://localhost:4000/users";
	const columns = [
		{ headerName: "Id", field: "id", filter: "agTextColumnFilter" },
		{ headerName: "Name", field: "name", filter: "agTextColumnFilter" },
		{ headerName: "Email", field: "email", filter: "agTextColumnFilter" },
		{ headerName: "Phone", field: "phone", filter: "agTextColumnFilter" },
		{ headerName: "Date of Birth", field: "dob", filter: "agTextColumnFilter" },
		{
			headerName: "Actions",
			field: "id",
			cellRendererFramework: (params) => (
				<div>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => handleUpdate(params.data)}
					>
						Update
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => handleDelete(params.value)}
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => setTableData(resp));
	};

	const onGridReady = (params) => {
		setGridApi(params);
	};

	const handleDelete = (id) => {
		const confirm = window.confirm(
			"Are you sure, you want to delete this row:",
			id
		);
		if (confirm) {
			fetch(url + `/${id}`, {
				method: "DELETE",
			})
				.then((resp) => resp.json())
				.then((resp) => getUsers());
		}
	};

	const handleUpdate = (oldData) => {
		setFormData(oldData);
		handleClickOpen();
	};

	const handleFormSubmit = () => {
		if (formData.id) {
			const confirm = window.confirm(
				"Are you sure, you want to update this row?"
			);

			if (confirm) {
				fetch(url + `/${formData.id}`, {
					method: "PUT",
					body: JSON.stringify(formData),
					headers: {
						"content-type": "application/json",
					},
				})
					.then((resp) => resp.json())
					.then((resp) => {
						getUsers();
						handleClose();
					});
			}
		} else {
			fetch(url, {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"content-type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((resp) => {
					getUsers();
					handleClose();
				});
		}
	};

	const defaultColDef = {
		flex: 1,
		filter: true,
		floatingFilter: true,
		sortable: true,
	};

	return (
		<div align="center">
			<h1>React-App</h1>
			<h4>Crud operations with Json-server ag-Grid</h4>
			<Grid align="right">
				<Button variant="contained" color="primary" onClick={handleClickOpen}>
					Add User
				</Button>
			</Grid>
			<div className="ag-theme-alpine" style={{ height: 400 }}>
				<AgGridReact
					rowData={tableData}
					columnDefs={columns}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
				></AgGridReact>
			</div>
			<FormDialog
				open={open}
				handleClose={handleClose}
				data={formData}
				onChange={onChange}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
};
export default App;
