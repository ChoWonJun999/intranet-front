import DateField from './DateField';
import DateRangeField from './DateRangeField';

type CommonProps = {
  viewsType?: 'year' | 'month' | 'day';
  defaultValue?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
  range?: boolean;
};

export default function CustomDateField(props: CommonProps) {
  if (props.range) {
    return <DateRangeField {...props} />;
  }
  return <DateField {...props} />;
}
