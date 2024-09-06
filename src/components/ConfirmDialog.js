import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export  const ConfirmDialog = ({open,onClose,task, onConfirm}) => {
    return(
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure that you want delete task "{task}"
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onConfirm} color="secondary">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}