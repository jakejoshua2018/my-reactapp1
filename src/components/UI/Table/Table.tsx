import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, multiSelectFilter, Comparator, numberFilter } from 'react-bootstrap-table2-filter';

const Table = (props: any) => {

  let tableHeaderElement: any[] = [];
  let columns: any[] = [];
  let selectRow: any;
  

  //For getting the Table headers.
  if (props.tableContent.length !== 0) {

    //Table Header Elements
    for (let [key, value] of Object.entries(props.tableContent[0]) ) tableHeaderElement.push(key);

    tableHeaderElement.forEach((item) => {

      let filterListElement: any = null, filter: any = null, formatter: any = null;
      let selectOptions: any = null, defaultOption: any =  [ ], defaultComparator: any=null;
      let defaultComparatorList: any[ ] =[Comparator.GT, Comparator.EQ, Comparator.LT];

      //For setting the Table headers filters.
      for (let [key, value] of Object.entries(props.filterList )) {

        filterListElement = value;
        if (item === filterListElement.element) {

          selectOptions = filterListElement.options;
          defaultOption = filterListElement.defaultOption;

          switch(filterListElement.defaultComparator) {

            case 'EQ': defaultComparator = Comparator.EQ; break;
            case 'GT': defaultComparator = Comparator.GT; break;
            case 'LT': defaultComparator = Comparator.LT; break;
            case 'GE': defaultComparator = Comparator.GE; defaultComparatorList.push([defaultComparator,Comparator.LE]); break;            
            case 'LE': defaultComparator = Comparator.LE; defaultComparatorList.push([defaultComparator,Comparator.GE]); break;
            case 'LIKE': defaultComparator = Comparator.LIKE; defaultComparatorList.push(defaultComparator); break;          
            case 'NE': defaultComparator = Comparator.NE; defaultComparatorList.push(defaultComparator); break;
            default: defaultComparator = null;
          }
         
          switch( filterListElement.type ) {

            case 0: //TextFilter

              filter= textFilter();
            break;

            case 1: //SelectFilter

              formatter = (cell: any) => selectOptions[cell];
              filter = selectFilter({
                options: selectOptions,
                defaultValue: defaultOption,
                getFilter: (filter: any) => console.log('getFilter',filter),
                onFilter: (filterValue: any) => console.log('onFilter',filterValue),
              });
            break;

            case 2: //MutiSelectFilter

              formatter = (cell: any) => selectOptions[cell];
              filter = multiSelectFilter({
                options: selectOptions,
                withoutEmptyOption: true,
                defaultValue: defaultOption,
                comparator: Comparator.LIKE, // default is Comparator.EQ
                getFilter: (filter: any) => console.log('getFilter',filter),
                onFilter: (filterValue: any) => console.log('onFilter',filterValue),
              });
            break;

            case 4: //numberFilter
              
              filter = numberFilter({
                options: selectOptions,  // if options defined, will render number select instead of number input
                withoutEmptyComparatorOption: true,  // dont render empty option for comparator
                withoutEmptyNumberOption: true,  // dont render empty option for number select if it is defined
                comparators: defaultComparatorList,  // Custom the comparators
                defaultValue: { number: defaultOption, comparator: defaultComparator },  // default value
                getFilter: (filter: any) => { // priceFilter was assigned once the component has been mounted.
                  //priceFilter = filter;
                },
                onFilter: (filterValue: any) => console.log('onFilter',filterValue),
              });
            break;
            default:
              formatter = null;
              filter = null;
            
          }
        }
      }

      let tableHead: any = { 
        dataField: item, 
        text: item.toUpperCase(), 
        sort: true, 
        formatter: formatter,
        filter: filter
        
      };

      columns.push(tableHead);
      filter = null;
      formatter = null;
    });

    switch(props.rowSelect) {

      case 'checkbox': 
        selectRow= {mode:'checkbox'};
      break;

      case 'radio':
        selectRow=  {
        mode: 'radio',
        clickToSelect: true
        };
      break;

      default:
        selectRow = "none";
    }
    
  } else {
    columns = [{
      dataField: 'id',
      text: 'Table Data Status',
    } ];
    selectRow = "none";
  }
  
    
  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>{props.tableCaption}</h3>;

  const customTotal = (from: any, to: any, size: any) => (
    <span className="react-bootstrap-table-pagination-total">
       Showing { from } to { to } of { size } Results
    </span>
  );

  const afterFilter = (newResult: any, newFilters: any) => {
    console.log('afterFilter-newResult',newResult);
    console.log('afterFilter-newFilters',newFilters);
  }

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 3,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    //hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: props.tableContent.length
    }], // A numeric array is also available. the purpose of above example is custom the text
    onSizePerPageChange: (sizePerPage: any, page: any) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page: any, sizePerPage: any) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };
  //console.log(props.tableContent)

  let tableJSX = (<BootstrapTable
                      bootstrap4
                      classes= {props.className}
                      keyField='id' 
                      data={ props.tableContent } //Table Data
                      caption={<CaptionElement />}
                      columns={ columns }         //Table Header
                      // bordered={ false }
                      // striped
                      // hover
                      // condensed
                      selectRow={ selectRow }
                      //tabIndexCell
                      noDataIndication={'  No Data '}
                      pagination={ paginationFactory(options) }
                      filter={ filterFactory({afterFilter}) }
                  />);
  
  if(selectRow === 'none') {
    tableJSX = (<BootstrapTable
      classes= {props.className}
      bootstrap4
      keyField='id' 
      data={ props.tableContent } //Table Data
      caption={<CaptionElement />}
      columns={ columns }         //Table Header
      noDataIndication={'  No Data '}
      pagination={ paginationFactory(options) }
      filter={ filterFactory({afterFilter}) }
  />);
  }
    
  return (
    tableJSX 
  );
}

export default Table;
