import React from 'react';
import Box from '@mui/material/Box';
import { useQuery, useQueryClient } from 'react-query';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridValueGetterParams,
  GridValueSetterParams,
} from '@mui/x-data-grid';
import { Products_Product, Products_ProductGroup } from './API/Vending';
import { useAPI } from './API';
import { error } from 'console';

export interface ProductProps
{
  groups: Record<number, Products_ProductGroup>;
}

type GridRowsModel =
{
  id: GridRowId;
  item: Products_Product,
  groups: string;
  isNew: boolean,
};

interface EditToolbarProps
{
  handleAddClick: () => void,
}

function EditToolbar( props: EditToolbarProps )
{
  const { handleAddClick } = props;

  const handleClick = () => {
    handleAddClick();
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={ handleClick }>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Products( props: ProductProps )
{
  const { groups } = props;

  const api = useAPI();
  const queryClient = useQueryClient();

  const [ rows, setRows ] = React.useState<GridRowsModel[]>( [] );
  const [ rowModes, setRowModes ] = React.useState<GridRowModesModel>( {} );

  const { isLoading, isError, isSuccess, data } = useQuery<Record<string,Products_Product>, Error>( 'Products_Product', async () => { return await api.getProducts() } );

  React.useEffect( () => {
    let rows: GridRowsModel[] = [];
    const rowModes: GridRowModesModel = {};
    if( !isSuccess )
    {
      return;
    }

    for( let k in data )
    {
      const item = data[k];
      rows = [ ...rows, { id: item.id, item: item, groups: (item.groups ? item.groups.map( group => group.id ) : []).join(","), isNew: false } ];
      rowModes[ data[k].id ] = { mode: GridRowModes.View };
    }

    setRows( rows );
    setRowModes( rowModes );
  }, [ isSuccess, data ] );

  const processRowUpdate = React.useCallback(
    async( newRow: GridRowsModel ) => {
      const updatedRow = { ...newRow, isNew: false };
      updatedRow.item.groups = updatedRow.groups.split(",").map( id => groups[ Number(id) ] );
      var rc;

      if( newRow.isNew )
        rc = newRow.item._create();
      else
        rc = newRow.item._save();

      try
      {
        await rc;
        queryClient.invalidateQueries( 'Products_Product' );
      }
      catch( msg )
      {
        alert( `Error saving: ${JSON.stringify(msg)}` );
        throw msg;
      }
      return updatedRow;
    }, [],
  );

  if( isLoading || data === undefined )
    return (
      <Box>Loading....</Box>
    );

  if( isError )
    return (
      <Box>Error....</Box>
    );

  const handleRowEditStop: GridEventListener<'rowEditStop'> = ( params, event ) => {
    if ( params.reason === GridRowEditStopReasons.rowFocusOut )
    {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = ( id: GridRowId ) => () => {
    setRowModes( { ...rowModes, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } } );
  };

  const handleSaveClick = ( id: GridRowId ) => () => {
    setRowModes( { ...rowModes, [id]: { mode: GridRowModes.View } } );
  };

  const handleDeleteClick = ( id: GridRowId ) => () => {
    const row = rows.filter( ( row ) => row.item.id === id )[0];
    row.item._delete();
    queryClient.invalidateQueries( 'Products_Product' );
  };

  const handleCancelClick = ( id: GridRowId ) => () => {
    setRowModes( { ...rowModes, [id]: { mode: GridRowModes.View, ignoreModifications: true } } );

    const editedRow = rows.find( ( row ) => row.item.id === id );
    if ( editedRow!.isNew )
    {
      setRows( rows.filter( ( row ) => row.item.id !== id ) );
    }
  };

  const handleAddClick = () => {
    const id = 0;
    setRows( [ ...rows, { id: id, item: new Products_Product( api.vending, id ), groups: "", isNew: true } ] );
    setRowModes( { ...rowModes, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } } );
  };

  const handleRowModesModelChange = ( rowModes: GridRowModesModel ) => {
    setRowModes( rowModes );
  };

  const handleValueGet = ( params: GridValueGetterParams ) => {
    const { row, field } = params;
    return row.item[ field ];
  };

  const handleValueSet = ( params: GridValueSetterParams, field: string ) => {
    const { row, value } = params;
    row.item[ field ] = value;
    return row;
  };

  const handleProcessRowUpdateError = ( error: any ) => {
    alert( "Error Saving: " + error.toString() );
  }

  // const group_names = Object.values( groups ).map( (i) => ( { 'value': i.id, 'label': i.name } ) );

  const productColumns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 20 },
    { field: 'groups', headerName: 'Groups', width: 100, editable: true },
    { field: 'name', headerName: 'Name', width: 200, editable: true, valueGetter: handleValueGet, valueSetter: (parms) => handleValueSet( parms, 'name' ) },
    { field: 'cost', headerName: 'Cost', width: 100, type: 'number', editable: true, valueGetter: handleValueGet, valueSetter: (parms) => handleValueSet( parms, 'cost' ) },
    { field: 'location', headerName: 'Location', width: 70, editable: true, valueGetter: handleValueGet, valueSetter: (parms) => handleValueSet( parms, 'location' ) },
    { field: 'available', headerName: 'Available', width: 100, type: 'number', editable: true, valueGetter: handleValueGet, valueSetter: (parms) => handleValueSet( parms, 'available' ) },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
         const isInEditMode = rowModes[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <DataGrid
        rows={ rows }
        columns={ productColumns }
        editMode="row"
        rowModesModel={ rowModes }
        onRowModesModelChange={ handleRowModesModelChange }
        onRowEditStop={ handleRowEditStop }
        processRowUpdate={ processRowUpdate }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        rowSelection={ false }
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { handleAddClick },
        }}
      />
    </div>
  );
}