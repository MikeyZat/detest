const baseComponents =
  'accordion alert badge breadcrumb btn card carousel slide collapse dropdown modal nav navbar offcanvas pagination placeholder progress toast container grid row col'.split(
    ' '
  );

const baseComponentsMap = Object.fromEntries(
  baseComponents.map((name) => [name, `.${name}`])
);

const extendedMap = {
  breadcrumbItem: '.breadcrumb-item',
  buttonGroup: '.btn-group',
  cardBody: '.card-body',
  cardTitle: '.card-title',
  cartText: '.card-text',
  carouselItem: '.carousel-item',
  closeButton: '.btn-close',
  dropdownToggle: '.dropdown-toggle',
  list: '.list-group',
  listGroup: '.list-group',
  listItem: '.list-group-item',
  listGroupItem: '.list-group-item',
  dialog: '.modal-dialog',
  modalDialog: '.modal-dialog',
  navbarItem: '.nav-item',
  navItem: '.nav-item',
  paginationItem: '.page-item',
  placeholderGlow: '.placeholder-glow',
  progressBar: '.progress-bar',
  spinner: '.spinner-border',
  toastHeader: '.toast-header',
  formControl: '.form-control',
  formSelect: '.form-select',
  checkbox: '.form-check',
  range: '.form-range',
  inputGroup: '.input-group',
  gridRow: '.row',
  gridCol: '.col',
  gridColumn: '.col',
};

module.exports = { ...baseComponentsMap, ...extendedMap };
