import Layout from './layout'
import { ReactElement, useEffect } from 'react'
import RecordsService from '@/services/RecordsService'

export default function Home() {
  const { 
    records,
    formData,
    setFormData,
    deleteRecord,
    createRecord,
    loading,
    formHasErrors,
    formError
  } = RecordsService()

  if (!loading) {
    return <div style={{ margin: '0 auto', maxWidth: 500 }}>Loading records...</div>
  }

  return (
    <main>
      <div style={{ margin: '0 auto', maxWidth: 500 }}>
        <h2>Records:</h2>
        { records?.length && records.map((record: RecordType, index: number) => (
          <div style={{ display: 'flex', padding: 5, borderBottom: '1px solid gray' }} key={index}>
            <div style={{ flex: 5 }}>{ record.title }</div>
            <div style={{ flex: 1 }}>{ record.release_year }</div>
            <div style={{ flex: 1 }}><button onClick={() => deleteRecord(record)}>Delete</button></div>
          </div>
        )) }
        { !records?.length && <div>No records in db.</div> }

        <h2>Create record:</h2>
        <div style={{ marginBottom: 20, color: "gray", fontSize: ".75em" }}>You can use imd id "tt8589698" Ninja Turtles for testing, just insert the id in the imd_id field and submit.</div>
        <div style={{ marginBottom: 20 }}>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="title" />
          <input value={formData.release_year} onChange={e => setFormData({...formData, release_year: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="release_year" />
          <input value={formData.imdb_id} onChange={e => setFormData({...formData, imdb_id: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="imdb_id" />
          <div style={{ marginBottom: 5, color: 'red', fontSize: '.75em' }}>
            { formHasErrors && formData.title.length == 0 && <div>Please enter the title</div> }
            { formHasErrors && formData.release_year.length == 0 && <div>Please enter the release year</div> }
            { formError && <div>{ formError }</div> }
          </div>
          <button style={{ display: 'block', padding: 5, marginTop: 15}} onClick={createRecord}>Create new record</button>
        </div>
      </div>
    </main>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}