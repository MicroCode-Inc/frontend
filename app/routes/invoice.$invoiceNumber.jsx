import { useLoaderData, Link } from 'react-router'
import { getInvoice } from '../services/purchaseApi'
import { formatCurrency } from '../utils/helpers'

export async function loader({ params }) {
  const { invoiceNumber } = params
  const invoice = await getInvoice(invoiceNumber)
  return invoice
}

export default function Invoice() {
  const invoice = useLoaderData()

  const handlePrint = () => {
    window.print()
  }

  // Format date for display
  const invoiceDate = new Date(invoice.purchase_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className='container page-transition py-4'>
      {/* Hide this button when printing */}
      <div className='d-print-none mb-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to='/profile' className='btn btn-outline-secondary'>
            ← Back to Profile
          </Link>
          <button onClick={handlePrint} className='btn btn-primary'>
            🖨️ Print as PDF
          </button>
        </div>
      </div>

      {/* Invoice content - styled for print */}
      <div className='card border-0 shadow-sm' id='invoice'>
        <div className='card-body p-5'>
          {/* Header */}
          <div className='d-flex justify-content-between align-items-start mb-5'>
            <div>
              <h1 className='display-5 mb-1'>INVOICE</h1>
              <p className='text-muted mb-0'>MicroCode Learning Platform</p>
            </div>
            <div className='text-end'>
              <p className='mb-1'><strong>Invoice #:</strong> {invoice.invoice_number}</p>
              <p className='mb-0 text-muted'>{invoiceDate}</p>
            </div>
          </div>

          <hr className='my-4' />

          {/* Customer Info */}
          <div className='row mb-4'>
            <div className='col-md-6'>
              <h5 className='mb-3'>Bill To:</h5>
              {invoice.user && (
                <address>
                  <strong>{invoice.user.username}</strong><br />
                  {invoice.user.email}
                </address>
              )}
            </div>
            <div className='col-md-6 text-md-end'>
              <h5 className='mb-3'>Payment Method:</h5>
              <p className='mb-0'>Mock Payment (Demo)</p>
              <p className='text-muted mb-0'><small>No actual charges were made</small></p>
            </div>
          </div>

          <hr className='my-4' />

          {/* Course Details */}
          <div className='mb-4'>
            <h5 className='mb-3'>Course Details:</h5>
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>
                  <tr className='border-bottom'>
                    <th scope='col'>Course</th>
                    <th scope='col' className='text-end'>Original Price</th>
                    <th scope='col' className='text-end'>Discount</th>
                    <th scope='col' className='text-end'>Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {invoice.course && (
                        <>
                          <strong>{invoice.course.name}</strong>
                          <br />
                          <small className='text-muted'>{invoice.course.description}</small>
                        </>
                      )}
                    </td>
                    <td className='text-end'>{formatCurrency(invoice.price_paid)}</td>
                    <td className='text-end'>
                      {invoice.discount_applied > 0 ? (
                        <span className='text-success'>-{formatCurrency(invoice.discount_applied)}</span>
                      ) : (
                        <span className='text-muted'>—</span>
                      )}
                    </td>
                    <td className='text-end'><strong>{formatCurrency(invoice.final_price)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className='my-4' />

          {/* Totals */}
          <div className='row'>
            <div className='col-md-6 offset-md-6'>
              <div className='d-flex justify-content-between mb-2'>
                <span>Subtotal:</span>
                <span>{formatCurrency(invoice.price_paid)}</span>
              </div>
              {invoice.discount_applied > 0 && (
                <div className='d-flex justify-content-between mb-2 text-success'>
                  <span>Discount Applied:</span>
                  <span>-{formatCurrency(invoice.discount_applied)}</span>
                </div>
              )}
              <div className='d-flex justify-content-between mb-2'>
                <span>Tax:</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <strong className='fs-5'>Total Paid:</strong>
                <strong className='fs-5'>{formatCurrency(invoice.final_price)}</strong>
              </div>
            </div>
          </div>

          <hr className='my-5' />

          {/* Footer */}
          <div className='text-center text-muted'>
            <p className='mb-1'>Thank you for your purchase!</p>
            <p className='mb-1'>You now have lifetime access to this course.</p>
            <p className='mb-0'><small>For support, contact: support@microcode.com</small></p>
          </div>

          {/* Success message for print */}
          <div className='alert alert-success mt-4 d-print-none'>
            <h5 className='alert-heading'>✓ Purchase Successful!</h5>
            <p className='mb-0'>
              The course has been added to your account. You can access it anytime from your profile page.
            </p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .d-print-none {
            display: none !important;
          }
          .card {
            border: none !important;
            box-shadow: none !important;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  )
}
