import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { PERSONALDATAINITIALVALUES, SOCIALLIFEOPTIONS } from '@/constants/personal_data';
import { PersonalDataSchema, PersonalDataSchemaType } from '@/schema';
import Button from '@/components/UI/Button';
import { useWeatherState } from '@/state/weather/hooks';
import CollapsableInput from './CollapsableInput';

type TProps = {
  isLoading: boolean;
  savePersonalData: (payload: PersonalDataSchemaType) => void;
};
type KEYVALUE = { [key: string]: string };

function SidePanel({ savePersonalData, isLoading }: TProps) {
  const [list, setList] = useState<{ emotionList: KEYVALUE; socialLifeList: KEYVALUE }>({
    emotionList: { initialKey: '' },
    socialLifeList: { initialKey: '' },
  });
  const [noOfFiles, setNoOfFiles] = useState(0);
  const { weather } = useWeatherState();
  const [selectedAction, setSelectedAction] = useState('Save');

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      ...PERSONALDATAINITIALVALUES,
      high_temperature: weather ? weather.highestTemperature : 0,
      low_temperature: weather ? weather.lowestTemperature : 0,
    },
    validationSchema: PersonalDataSchema,
    onSubmit: async (results, { resetForm, setSubmitting }) => {
      savePersonalData(results);
      if (selectedAction === 'SaveEnter') {
        resetForm({});
        setList({
          emotionList: { initialKey: '' },
          socialLifeList: { initialKey: '' },
        });
        setNoOfFiles(0);
      }
      setSubmitting(false);
    },
  });

  const handleEventListener = useCallback((action: string) => {
    setSelectedAction(action);
  }, []);

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setNoOfFiles(files.length);
      setFieldValue('photos', files);
    }
  };

  useEffect(() => {
    //* debouncing on state update
    const timer = setTimeout(() => {
      setFieldValue('emotional_list', Object.values(list.emotionList));
      setFieldValue('social_life_list', Object.values(list.socialLifeList));
    }, 400);
    return () => clearTimeout(timer);
  }, [list, setFieldValue]);
  return (
    <form
      className="flex flex-col gap-y-3 w-full overflow-y-auto max-w-[377px] bg-side dark:bg-dark rounded-md pl-4 pr-6 py-6 mobile:max-w-full mobile: dark:text-main"
      noValidate
      onSubmit={handleSubmit}
    >
      <CollapsableInput
        value={values.date}
        type="date"
        onChange={handleChange}
        title="Date"
        name="date"
        error={touched.date && errors.date}
      />
      <CollapsableInput
        value={values.high_temperature}
        type="number"
        onChange={handleChange}
        title="High Temperature (F)"
        name="high_temperature"
        error={touched.high_temperature && errors.high_temperature}
        setOnWheel={true}
      />
      <CollapsableInput
        value={values.low_temperature}
        type="number"
        onChange={handleChange}
        title="Low Temperature (F)"
        name="low_temperature"
        error={touched.low_temperature && errors.low_temperature}
        setOnWheel={true}
      />
      <CollapsableInput
        value={values.weather}
        onChange={handleChange}
        title="Weather Type"
        name="weather"
        error={touched.weather && errors.weather}
      />
      <CollapsableInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setList((prev) => ({
            ...prev,
            emotionList: {
              ...prev.emotionList,
              [name]: value,
            },
          }));
        }}
        title="Emotion List"
        fields={list.emotionList}
        addNewField={() => {
          setList((prev) => ({
            ...prev,
            emotionList: {
              ...prev.emotionList,
              [uuidv4()]: '',
            },
          }));
        }}
        isAddingFieldEnabled
        error={touched.emotional_list && errors.emotional_list}
      />
      <CollapsableInput
        value={values.emotional_overall}
        onChange={handleChange}
        title="Emotion Overall"
        name="emotional_overall"
        error={touched.emotional_overall && errors.emotional_overall}
      />

      <CollapsableInput
        value={values.relative_finance_status}
        onChange={handleChange}
        title="Relative Finance Status"
        name="relative_finance_status"
        error={touched.relative_finance_status && errors.relative_finance_status}
      />
      <CollapsableInput
        value={values.exercise_time}
        onChange={handleChange}
        type="number"
        title="Exercise Total Time (min)"
        name="exercise_time"
        error={touched.exercise_time && errors.exercise_time}
      />
      <CollapsableInput
        value={values.health_overall}
        onChange={handleChange}
        title="Health Overall"
        name="health_overall"
        error={touched.health_overall && errors.health_overall}
      />
      <CollapsableInput
        value={values.any_social_life}
        isSelectInput
        onSelectOption={(item: string) => {
          setFieldValue('any_social_life', item);
        }}
        selectOptions={SOCIALLIFEOPTIONS}
        title="Any Social Life?"
        error={touched.any_social_life && errors.any_social_life}
      />
      <CollapsableInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setList((prev) => ({
            ...prev,
            socialLifeList: {
              ...prev.socialLifeList,
              [name]: value,
            },
          }));
        }}
        title="Social Life Activities"
        fields={list.socialLifeList}
        addNewField={() => {
          setList((prev) => ({
            ...prev,
            socialLifeList: {
              ...prev.socialLifeList,
              [uuidv4()]: '',
            },
          }));
        }}
        isAddingFieldEnabled
        error={touched.social_life_list && errors.social_life_list}
      />
      <CollapsableInput
        value={values.weight}
        onChange={handleChange}
        type="number"
        title="Weight (Pounds)"
        name="weight"
        error={touched.weight && errors.weight}
      />
      <CollapsableInput
        value={values.family_status}
        onChange={handleChange}
        title="Family Status"
        name="family_status"
        error={touched.family_status && errors.family_status}
      />
      <CollapsableInput
        value={values.device_screen_time}
        onChange={handleChange}
        title="Device Screen Time"
        name="device_screen_time"
        error={touched.device_screen_time && errors.device_screen_time}
      />
      <CollapsableInput
        value={values.work_life_balance}
        onChange={handleChange}
        type="number"
        title="Work Life Balance (0-10)"
        name="work_life_balance"
        error={touched.work_life_balance && errors.work_life_balance}
      />
      <CollapsableInput
        value={values.journaling}
        onChange={handleChange}
        title="Journaling"
        name="journaling"
        error={touched.journaling && errors.journaling}
      />
      <CollapsableInput
        handleFileChange={handleProfileChange}
        noOfFiles={noOfFiles}
        type="file"
        title="Photos"
        name="photos"
        error={false}
      />

      <Button
        type="submit"
        value="Save"
        className="bg-blue dark:bg-darkBlue w-full disabled:bg-disabledBlue"
        title="Save"
        isLoading={isLoading}
        onClick={() => handleEventListener('Save')}
      />
      <Button
        type="submit"
        value="SaveEnter"
        className="bg-[#F5B11A] w-full disabled:bg-[#f5b01aa7] dark:bg-darkTable"
        title="Save & Enter New Data"
        onClick={() => handleEventListener('SaveEnter')}
        isLoading={isLoading}
      />
    </form>
  );
}
export default SidePanel;
