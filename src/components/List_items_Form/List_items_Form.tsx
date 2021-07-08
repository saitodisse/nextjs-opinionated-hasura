/* eslint-disable no-console */
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '../forms/FormInput/FormInput'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { List_items_validation_schema } from '../../model/schemas/List_items_validation_schema'
import { FormImage } from '../forms/FormImage/FormImage'

export type List_items_FormProps = {
  onSubmitConfirm: (submitProps: any) => void
  initialFormData: {
    // id: router?.query?.list_item_id as string,
    title: string
    body: string
    url: string
    imageUrl: string
    publishedAt: string
  }
}

export const List_items_Form: React.FunctionComponent<List_items_FormProps> = ({
  onSubmitConfirm,
  initialFormData = {},
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors: validationErrors },
    formState,
    reset,
    watch,
  } = useForm<List_items_FormProps['initialFormData']>({
    mode: 'onChange',
    resolver: zodResolver(List_items_validation_schema),
    defaultValues: useMemo(() => {
      return initialFormData
    }, [initialFormData]),
  })

  const onSubmit = handleSubmit(
    async (submitProps) => {
      return onSubmitConfirm(submitProps)
    },
    (submitErrors) => {
      console.error('--  submitErrors: ', submitErrors)
    }
  )
  return (
    <form onSubmit={onSubmit} className='max-w-4xl md:w-full'>
      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t ' />
        </div>
      </div>

      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6'>List Item</h3>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-5 space-y-6 sm:p-6'>
                <FormInput
                  label='Title:'
                  name='title'
                  register={register}
                  defaultValue={initialFormData.title}
                  validationErrors={validationErrors}
                />

                <FormInput
                  label='Body:'
                  name='body'
                  register={register}
                  defaultValue={initialFormData.body}
                  validationErrors={validationErrors}
                />

                <FormInput
                  label='URL:'
                  name='url'
                  register={register}
                  defaultValue={initialFormData.url}
                  validationErrors={validationErrors}
                />

                <FormImage
                  label='Image URL:'
                  name='imageUrl'
                  register={register}
                  watch={watch}
                  defaultValue={initialFormData.imageUrl}
                  validationErrors={validationErrors}
                />

                <FormInput
                  label='Publish Date:'
                  type='date'
                  name='publishedAt_date'
                  register={register}
                  defaultValue={dayjs(initialFormData.publishedAt).format('YYYY-MM-DD')}
                  validationErrors={validationErrors}
                />

                <FormInput
                  label='Publish Time:'
                  type='time'
                  name='publishedAt_time'
                  register={register}
                  defaultValue={dayjs(initialFormData.publishedAt).format('HH:mm')}
                  validationErrors={validationErrors}
                />

                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      reset(initialFormData)
                    }}
                    className='btn btn-secondary btn-link'
                  >
                    RESET
                  </button>

                  <button type='submit' className='btn btn-primary' disabled={!formState.isValid}>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t ' />
        </div>
      </div>
    </form>
  )
}