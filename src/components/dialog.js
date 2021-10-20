import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

export default function FormDialog({
	open,
	handleClose,
	data,
	onChange,
	handleFormSubmit,
}) {
	const { id, name, email, phone, dob } = data;
	return (
		<div>
			{/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open alert dialog
			</Button> */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{id ? "Update User" : "Create new user"}
				</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							id="name"
							value={name}
							onChange={(e) => onChange(e)}
							placeholder="Enter name"
							label="Name"
							variant="outlined"
							margin="dense"
							fullWidth
						/>

						<TextField
							id="email"
							value={email}
							onChange={(e) => onChange(e)}
							placeholder="Enter email"
							label="Email"
							variant="outlined"
							margin="dense"
							fullWidth
						/>

						<TextField
							id="phone"
							value={phone}
							onChange={(e) => onChange(e)}
							placeholder="Enter phone number"
							label="Phone number"
							variant="outlined"
							margin="dense"
							fullWidth
						/>

						<TextField
							id="dob"
							value={dob}
							onChange={(e) => onChange(e)}
							placeholder="Enter Date of birth"
							label="Date of Birth"
							variant="outlined"
							margin="dense"
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary" variant="outlined">
						Cancel
					</Button>
					<Button
						onClick={() => handleFormSubmit()}
						color="primary"
						variant="contained"
					>
						{id ? "Update" : "Submit"}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
