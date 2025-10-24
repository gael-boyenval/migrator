import { PAGE_COMMON_STYLES } from '@/style/page';
import { colors } from '@/theme';

export const DETAILS_COMMON_STYLES = {
  ...PAGE_COMMON_STYLES,
  status: {
    marginBottom: 'var(--core-space-m)',
  },
  wrapperCommon: {
    display: 'flex',
    fontSize: '14px',
    lineHeight: '100%',
  },
  wrapperCommonTable: {
    borderBottom: '1px solid',
    borderBottomColor: colors.dsCoreColorBlue,
    marginBottom: 'var(--core-space-xl)',
  },
  wrapperConsult: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapperEdit: {
    flexDirection: 'column',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    margin: '0 var(--core-space-xl) var(--core-space-xl)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '20px',
    margin: 'var(--core-space-2xs) 0',
    alignItems: 'center',
    minWidth: '380px',
    '&:first-of-type': {
      marginTop: 'calc(var(--core-space-2xs) * -1)',
    },
  },
  rowLabel: {
    width: '190px',
    minWidth: '190px',
    maxWidth: '190px',
  },
  rowValue: {
    fontWeight: 600,
    fontStyle: 'normal',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    whiteSpace: 'pre-line',

    '&::before': {
      content: '":"',
      display: 'block',
      marginRight: 'var(--core-space-xs)',
    },
  },
  monthYearValue: {
    textTransform: 'capitalize',
  },
  fileRow: {
    margin: 'var(--core-space-m) 0',
  },
  sectionTitle: {
    '&:not(:first-of-type)': {
      marginTop: 'var(--core-space-xl)',
    },
    marginBottom: 'var(--core-space-xs)',
  },
  buttonContainer: {
    marginLeft: 'var(--core-space-xl)',
    '& > *:not(:last-child)': {
      marginRight: 'var(--core-space-xs)',
    },
    '& > *:not(:first-of-type)': {
      marginLeft: 'var(--core-space-xs)',
    },
  },
  buttonWrapper: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  },
  select: {
    fontSize: '14px',
    padding: 'var(--ds-semantic-spacing-3xs, 4px) var(--ds-core-size-04, 8px)',
    borderRadius: '4px',
    '& .MuiSelect-select': {
      background: 'none',
      border: 'none',
      padding: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused': {
      background: 'var(--ds-semantic-color-neutral-surface-medium-active, #D1D5DB)',
      borderRadius: 'var(--ds-semantic-radius-default, 4px)',
    },
    '& .MuiPaper-root': {
      border: 'none',
    },
  },
  linkSelect: {
    borderTop: '1px solid #D1D5DB',
    borderLeft: '1px solid #D1D5DB',
    borderRight: '1px solid #D1D5DB',
    marginTop: 5,
    marginLeft: 23,
    '& .MuiList-root': {
      padding: 0,
    },
  },
  menuItem: {
    color: 'var(--Color-Neutral-ds-core-color-gray-900, #2D3642)',
    textDecorationLine: 'underline',
    borderBottom: '1px solid #D1D5DB',
    fontSize: '14px',
    '& .MuiButtonBase-root': {
      padding: 8,
      paddingRight: 54,
    },
  },
};
